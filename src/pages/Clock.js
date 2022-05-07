import { Component, createRef } from 'react';
import * as THREE from 'three';
import * as POSTPROCESSING from 'postprocessing';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { getSunPos, getMoonPos, getDateStr, getTimeStr } from '../Util.js';

import landModel from '../images/land.glb';
const customFont = 'https://threejs.org/examples/fonts/droid/droid_sans_regular.typeface.json';

class Clock extends Component {
    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.myRef = createRef();

        this.lat = 0;
        this.lon = 0;
        navigator.geolocation.getCurrentPosition((pos) => {
            this.lat = pos.coords.latitude / 180 * Math.PI;
            this.lon = pos.coords.longitude / 180 * Math.PI;
        });
    }

    componentDidMount() {

        this.canvas = document.createElement('canvas');
        this.mount.appendChild(this.canvas);

        this.camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
        this.camera.position.set(-9, 4, -4);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('#000000');
        this.scene.add(this.camera);
        
        this.ctx = this.canvas.getContext('webgl');

        this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			context: this.ctx,
			antialias: true,
            alpha: true
		})
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
            this.composer.setSize(window.innerWidth, window.innerHeight);
        });
        
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.listenToKeyEvents(this.canvas);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.screenSpacePanning = false;
        this.controls.minDistance = 5;
        this.controls.maxDistance = 100;

        this.initAmbientLight();
        this.initSun();
        this.initMoon();
        this.initLand();
        this.initLampLight();
        this.initTimeText();
        this.initDateText();
        this.initGodRays();

        this.start();
    }

    initAmbientLight() {
		const ambientLight = new THREE.AmbientLight( '#222222' );
		this.scene.add( ambientLight );
        this.ambientLight = ambientLight;
    }

    initSun() {
        const group = new THREE.Group();
        const sun_geo = new THREE.SphereGeometry(0.15, 10, 10);
        const sun_mat = new THREE.MeshLambertMaterial({ emissive: '#ffbb77' });
        const sun = new THREE.Mesh(sun_geo, sun_mat);

        const sun_light = new THREE.PointLight('#775533', 5);
        sun_light.castShadow = true;
        sun_light.shadow.bias = -0.0002;
        sun_light.shadow.mapSize.width = 1400;
        sun_light.shadow.mapSize.height = 1400;
        sun.add(sun_light);

        sun.position.set(0, 0, 0);
        group.add(sun);
        this.scene.add(group);
        this.sun = group;
    }

    initMoon() {
        const group = new THREE.Group();
        const moon_geo = new THREE.SphereGeometry(0.17, 20, 20);
        const moon_mat = new THREE.MeshLambertMaterial({ emissive: '#888899' });
        const moon = new THREE.Mesh(moon_geo, moon_mat);
        moon.castShadow = true;

        const moon_light = new THREE.PointLight( '#444499', 0 );
        moon_light.castShadow = true;
        moon_light.shadow.bias = -0.0002;
        moon_light.shadow.mapSize.width = 1400;
        moon_light.shadow.mapSize.height = 1400;
        moon.add(moon_light);

        const moon_cover_geo = new THREE.SphereGeometry(0.18, 20, 10, Math.PI, Math.PI);
        const moon_cover_mat = new THREE.MeshLambertMaterial({ color: '#000000' });
        const moon_cover = new THREE.Mesh(moon_cover_geo, moon_cover_mat);
        moon.add(moon_cover);

        moon.position.set(0, 0, 0);
        group.add(moon);
        this.scene.add(group);
        this.moon = group;
    }

    initLand() {
        const group = new THREE.Group();
        const loader = new GLTFLoader();
        const scene = this.scene;

        loader.load(landModel, function (gltf) {
            gltf.scene.traverse(function(node) { 
                if (node instanceof THREE.Mesh) { 
                    node.position.set(0, -1, 0);
                    node.castShadow = true;
                    node.receiveShadow = true;
                } 
            });
            group.add( gltf.scene );
            scene.add(group);
        }, undefined, function (error) {
            console.error(error);
        });

        return group;
    }

    initLampLight() {
        const group = new THREE.Group();
        const lamp_geo = new THREE.SphereGeometry(0.02, 1, 1);
        const lamp_mat = new THREE.MeshLambertMaterial({ color: '#000000' });
        const lamp = new THREE.Mesh(lamp_geo, lamp_mat);

        const lamp_light = new THREE.PointLight('#ff5500', 3, 0.8, 1);
        lamp.add(lamp_light);

        lamp.position.set(-0.63, 0.14, 0.35);
        group.add(lamp);
        this.scene.add(group);
        this.lampLight = lamp_light;
    }

    initTimeText() {
        const group = new THREE.Group();
        const date = new Date();
        const str = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        const fontSize = 0.15;

        const loader = new FontLoader();
        loader.load(customFont, function (font) {
            const textGeo = new TextGeometry(str, {
                font: font,
                size: fontSize,
                height: 0.05,
            });
            const textMat = new THREE.MeshLambertMaterial({ color: '#555555', emissive: '#aa2222' });
            const text = new THREE.Mesh(textGeo, textMat);
            text.position.set(-(fontSize*str.length)*0.37, -0.9, 8);
            group.add(text);
        });

        group.position.set(0, 0, 0)
        this.scene.add(group);
        this.timeText = group;
    }

    initDateText() {
        const group = new THREE.Group();
        const date = new Date();
        const str = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
        const fontSize = 0.08;

        const loader = new FontLoader();
        loader.load(customFont, function (font) {
            const textGeo = new TextGeometry(str, {
                font: font,
                size: fontSize,
                height: 0.03,
            });
            const textMat = new THREE.MeshLambertMaterial({ color: '#555555', emissive: '#aa2222' });
            const text = new THREE.Mesh(textGeo, textMat);
            text.position.set(-(fontSize*str.length)*0.37, -1.2, 8);
            group.add(text);
        });

        group.position.set(0, 0, 0)
        this.scene.add(group);
        this.dateText = group;
    }

    initGodRays() {
        let godraysEffect_sun = new POSTPROCESSING.GodRaysEffect(this.camera, this.sun.children[0], {
            resolutionScale: 0.7,
            density: 0.5,
            decay: 0.9,
            weight: 0.9,
            samples: 10
        });
        let godraysEffect_moon = new POSTPROCESSING.GodRaysEffect(this.camera, this.moon.children[0], {
            resolutionScale: 0.7,
            density: 0.2,
            decay: 0.8,
            weight: 0.9,
            samples: 10
        });
        let smaaEffect = new POSTPROCESSING.SMAAEffect({});
        let renderPass = new POSTPROCESSING.RenderPass(this.scene, this.camera);
        let effectPass = new POSTPROCESSING.EffectPass(this.camera, godraysEffect_sun, godraysEffect_moon);
        let smaaPass = new POSTPROCESSING.EffectPass(this.camera, smaaEffect);
        this.composer = new POSTPROCESSING.EffectComposer(this.renderer);
        this.composer.addPass(renderPass);
        this.composer.addPass(effectPass);
        this.composer.addPass(smaaPass);
    }

    componentWillUnmount() {
        this.stop();
        window.removeEventListener('resize', () => {this.resize()});
        this.mount.removeChild(this.renderer.domElement);
    }

    start() {
        if (!this.frameId);
            this.frameId = requestAnimationFrame(this.animate)
    }

    stop() {
        window.cancelAnimationFrame(this.frameId);
    }

    animate() {

        // Get date
        let date = new Date();
        //date.setTime(date.getTime() + offset);
        //offset += 100000;

        // Atlanta solar eclipse time
        //date.setFullYear(2017, 7, 21);
        //date.setHours(14, 36, 0);

        // Sun position calculation
        const sunDist = 6;
        const sunPos = getSunPos(date, this.lat, this.lon);
        const sx = Math.sin(sunPos.azimuth) * sunDist;
        const sy = Math.sin(sunPos.altitude) * sunDist;
        const sz = -Math.cos(sunPos.azimuth) * sunDist;
        this.sun.position.set(sx, sy, sz);

        // Sun light color & intensity calculation
        const sunRedness = Math.pow(Math.abs(Math.cos(sunPos.altitude)), 30) * 0.2 + 0.4;
        const sunMesh = this.sun.children[0];
        const sunMat = sunMesh.material;
        sunMat.emissive.setRGB(sunRedness + 0.3, 0.7 - sunRedness/2, 0.5 - sunRedness/2);

        const sunLight = sunMesh.children[0];
        sunLight.color.setRGB(sunRedness, 0.5 - sunRedness/2, 0.33 - sunRedness/2);
        sunLight.intensity = 5 - Math.min(Math.sin(-sunPos.altitude)*4, 0);

        // Moon position calculation
        const moonDist = 5.4;
        const moonPos = getMoonPos(date, this.lat, this.lon);
        const mx = Math.sin(moonPos.azimuth) * moonDist;
        const my = Math.sin(moonPos.altitude) * moonDist;
        const mz = -Math.cos(moonPos.azimuth) * moonDist;
        this.moon.position.set(mx, my, mz);

        // Moon light intensity calculation (based on phase)
        const msV = new THREE.Vector3((sx*1000)-mx, (sy*1000)-my, (sz*1000)-mz);
        const mlV = new THREE.Vector3(mx, my, mz);
        const moonIllum = Math.max(-msV.normalize().dot(mlV.normalize()) + 1, 0) / 2;

        const moonMesh = this.moon.children[0];
        const moonLight = moonMesh.children[0];
        moonLight.intensity = Math.max(Math.sin(-sunPos.altitude), 0) * Math.max(Math.sin(moonPos.altitude)) * moonIllum + 0.1;

        // Moon phase calculation
        const moonCover = moonMesh.children[1];
        moonCover.lookAt((sx*1000), (sy*1000), (sz*1000));

        // Lamp light calculation
        if (sunPos.altitude > -0.16875) this.lampLight.color.setRGB(0, 0, 0);
        else this.lampLight.color.setRGB(Math.random()*0.2 + 0.8, 0.4, 0);

        // Ambient light calculation
        const ambientIllum = Math.max(Math.sin(sunPos.altitude), 0) * 0.2 + 0.05;
        this.ambientLight.color.setRGB(ambientIllum, ambientIllum, ambientIllum);

        // Time text update
        this.timeText.lookAt(this.camera.position);
        const timeStr = getTimeStr(date);
        const timeTextFontSize = 0.15;
        
        const timeTextMesh = this.timeText.children[0];
        const timeTextLoader = new FontLoader();
        timeTextLoader.load(customFont, function (font) {
            if (!timeTextMesh) return;
            timeTextMesh.geometry = new TextGeometry(timeStr, {
                font: font,
                size: timeTextFontSize,
                height: 0.05,
            });
            timeTextMesh.position.set(-(timeTextFontSize*timeStr.length)*0.37, -0.9, 8);
        });

        // Date text update
        this.dateText.lookAt(this.camera.position);
        const dateStr =  getDateStr(date);
        const dateTextFontSize = 0.08;

        const dateTextMesh = this.dateText.children[0];
        const dateTextLoader = new FontLoader();
        dateTextLoader.load(customFont, function (font) {
            if (!dateTextMesh) return;
            dateTextMesh.geometry = new TextGeometry(dateStr, {
                font: font,
                size: dateTextFontSize,
                height: 0.03,
            });
            dateTextMesh.position.set(-(dateTextFontSize*dateStr.length)*0.37, -1.2, 8);
        });

        this.composer.render();
        setTimeout( () => {
            this.frameId = window.requestAnimationFrame(this.animate);
        }, 100 );
    }

    resize() {
        setTimeout( () => {
            if (!this.renderer || !this.camera) return;
            this.renderer.setSize(this.props.width, this.props.height);
            this.camera.aspect = this.props.width / this.props.height;
            this.camera.updateProjectionMatrix();
        }, 100 );
    }

    render() {
        return (
            <div ref={this.myRef}>
                <div ref={(mount) => { this.mount = mount }}/>
            </div>
        )
    }
}

export default Clock;