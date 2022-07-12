import { Component, createRef } from 'react';
import * as THREE from 'three';
import * as POSTPROCESSING from 'postprocessing';
import { getScreenHeight } from '../../components/ui/Window';

class Scene extends Component {
    constructor(props) {
        super(props);

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.myRef = createRef();

        window.addEventListener('resize', () => {this.resize()});
    }

    componentDidMount() {
        const width = this.props.width;
        const height = this.props.height;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            60,
            width / height,
            0.1,
            1000
        );
        camera.position.z = 10;

        const renderer = new THREE.WebGLRenderer();
        renderer.setClearColor('#151515');
        renderer.setSize(width, height);

        //>>>>>>>> SCENE SETUP

        const ambientLight = new THREE.AmbientLight('#333333');
        scene.add(ambientLight);

        const centerObj_geo = new THREE.IcosahedronGeometry(0.2, 0);
        const centerObj_mat = new THREE.MeshLambertMaterial({ emissive: '#775533' });
        const centerObj1 = new THREE.Mesh(centerObj_geo, centerObj_mat);
        const pointLight1 = new THREE.PointLight( '#775533', 2 );
        centerObj1.add(pointLight1);
        const centerLin_geo = new THREE.IcosahedronGeometry(1, 1);
        const centerLin_mat = new THREE.LineBasicMaterial({ 
            color: '#ccaa99',
            linewidth: 1, 
            transparent: true, 
            opacity: 0.3 });
        const centerLin1 = new THREE.Line(centerLin_geo, centerLin_mat);
        centerObj1.add(centerLin1);
        scene.add(centerObj1);
        this.centerObj1 = centerObj1;

        const orbitObj1_geo = new THREE.DodecahedronGeometry(0.1, 0);
        const orbitObj_mat = new THREE.MeshLambertMaterial({ color: '#888888' });
        const orbitObj1 = new THREE.Mesh(orbitObj1_geo, orbitObj_mat);
        scene.add(orbitObj1);
        this.orbitObj1 = orbitObj1;

        const orbitObj2_geo = new THREE.DodecahedronGeometry(0.15, 0);
        const orbitObj2 = new THREE.Mesh(orbitObj2_geo, orbitObj_mat);
        scene.add(orbitObj2);
        this.orbitObj2 = orbitObj2;

        const orbitObj3_geo = new THREE.DodecahedronGeometry(0.08, 0);
        const orbitObj3 = new THREE.Mesh(orbitObj3_geo, orbitObj_mat);
        scene.add(orbitObj3);
        this.orbitObj3 = orbitObj3;

        const orbitObj4_geo = new THREE.DodecahedronGeometry(0.12, 0);
        const orbitObj4 = new THREE.Mesh(orbitObj4_geo, orbitObj_mat);
        scene.add(orbitObj4);
        this.orbitObj4 = orbitObj4;

        const orbitObj5_geo = new THREE.DodecahedronGeometry(0.22, 0);
        const orbitObj5 = new THREE.Mesh(orbitObj5_geo, orbitObj_mat);
        scene.add(orbitObj5);
        this.orbitObj5 = orbitObj5;
        
        const orbitObj6_geo = new THREE.DodecahedronGeometry(0.1, 0);
        const orbitObj6 = new THREE.Mesh(orbitObj6_geo, orbitObj_mat);
        scene.add(orbitObj6);
        this.orbitObj6 = orbitObj6;

        const orbitObj7_geo = new THREE.DodecahedronGeometry(0.17, 0);
        const orbitObj7 = new THREE.Mesh(orbitObj7_geo, orbitObj_mat);
        scene.add(orbitObj7);
        this.orbitObj7 = orbitObj7;

        const plane_geo = new THREE.CircleGeometry( 20, 64 )
        const plane_mat = new THREE.LineBasicMaterial({ 
            color: '#ffffff', 
            linewidth: 1, 
            transparent: true, 
            opacity: 0.07 });
        const plane = new THREE.Line(plane_geo, plane_mat);
        const pivot_geo = new THREE.PlaneGeometry( 0, 0 );
        const pivot_mat = new THREE.LineBasicMaterial({ color: '#ffffff' });
        const pivot1 = new THREE.Line(pivot_geo, pivot_mat);
        pivot1.add(plane);
        scene.add(pivot1);
        this.plane = plane;
        this.pivot1 = pivot1;

        ///

        let godraysEffect = new POSTPROCESSING.GodRaysEffect(camera, centerObj1, {
            resolutionScale: 0.7,
            density: 0.4,
            decay: 0.9,
            weight: 0.9,
            samples: 10
        });
        let smaaEffect = new POSTPROCESSING.SMAAEffect();
        let renderPass = new POSTPROCESSING.RenderPass(scene, camera);
        let effectPass = new POSTPROCESSING.EffectPass(camera, godraysEffect);
        let smaaPass = new POSTPROCESSING.EffectPass(camera, smaaEffect);
        let composer = new POSTPROCESSING.EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(effectPass);
        composer.addPass(smaaPass);
        this.composer = composer;

        //////////////////////

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;

        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';

        this.mount.appendChild(this.renderer.domElement);
        this.start();
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
        if (Date.now() < this.nextFrame) {
            requestAnimationFrame(this.animate);
            return;
        } else this.nextFrame = Date.now() + 1000/40;

        let height = this.renderer.domElement.scrollHeight * 2.5;
        let scrollY = window.scrollY - height + getScreenHeight() / 2;
        this.camera.position.y = -scrollY / height * 4;

        let rotationY_radians = Math.atan(-(this.camera.position.y * 2) / this.camera.position.z);
        this.camera.rotation.x = rotationY_radians;

        //>>>>>>>> ANIMATION SETUP

        let t = Date.now() % 400000 / 200000 * Math.PI;

        this.centerObj1.rotation.x -= 0.03;
        this.centerObj1.rotation.y -= 0.02;
        this.centerObj1.rotation.z += 0.01;

        this.orbitObj1.position.set(
            1.6*Math.sin(40*t+Math.PI*0.3), 
            -0.5*Math.cos(40*t+Math.PI*0.3), 
            1.6*Math.cos(40*t+Math.PI*0.3));

        this.orbitObj2.position.set(
            3.4*Math.sin(11*t-Math.PI*0.7), 
            1.5*Math.sin(11*t-Math.PI*0.7), 
            3.4*Math.cos(11*t-Math.PI*0.7));

        this.orbitObj3.position.set(
            3.4*Math.sin(11*t-Math.PI*0.7) + 0.4*Math.sin(t*6), 
            1.5*Math.sin(11*t-Math.PI*0.7), 
            3.4*Math.cos(11*t-Math.PI*0.7) + 0.4*Math.cos(t*6));

        this.orbitObj4.position.set(
            6*Math.sin(5*t+Math.PI*0.2), 
            -1*Math.sin(5*t+Math.PI*0.2), 
            6*Math.cos(5*t+Math.PI*0.2));

        this.orbitObj5.position.set(
            11.2*Math.sin(2*t-Math.PI*0.5), 
            Math.cos(2*t-Math.PI*0.5), 
            11.2*Math.cos(2*t-Math.PI*0.5));

        this.orbitObj6.position.set(
            11.2*Math.sin(2*t-Math.PI*0.5) + 0.5*Math.sin(t*4), 
            Math.cos(2*t-Math.PI*0.5), 
            11.2*Math.cos(2*t-Math.PI*0.5) + 0.5*Math.cos(t*4));

        this.orbitObj7.position.set(
            15*Math.sin(t+Math.PI*0.1), 
            -2*Math.sin(t+Math.PI*0.1), 
            15*Math.cos(t+Math.PI*0.1));

        this.orbitObj1.rotation.y += 0.05;
        this.orbitObj2.rotation.y += 0.03;
        this.orbitObj3.rotation.y += 0.02;
        this.orbitObj4.rotation.y += 0.01;
        this.orbitObj5.rotation.y += 0.005;
        this.orbitObj6.rotation.y += 0.003;
        this.orbitObj7.rotation.y += 0.002;

        this.plane.rotation.z -= 0.005;
        this.pivot1.rotation.set(Math.PI*0.5 + Math.PI*0.05*Math.sin(t*2), Math.PI*0.1*Math.cos(t), 0);

        //////////////////////////

        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.composer.render();
    }

    resize() {
        setTimeout( () => {
            if (!this.renderer || !this.composer || !this.camera) return;
            this.composer.setSize(this.props.width, this.props.height);
            this.camera.aspect = this.props.width / this.props.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.props.width, this.props.height);

            let godraysEffect = new POSTPROCESSING.GodRaysEffect(this.camera, this.centerObj1, {
                resolutionScale: 0.7,
                density: 0.4,
                decay: 0.9,
                weight: 0.9,
                samples: 10
            });
            let smaaEffect = new POSTPROCESSING.SMAAEffect();
            let renderPass = new POSTPROCESSING.RenderPass(this.scene, this.camera);
            let effectPass = new POSTPROCESSING.EffectPass(this.camera, godraysEffect);
            let smaaPass = new POSTPROCESSING.EffectPass(this.camera, smaaEffect);
            let composer = new POSTPROCESSING.EffectComposer(this.renderer);
            composer.addPass(renderPass);
            composer.addPass(effectPass);
            composer.addPass(smaaPass);
            this.composer = composer;
        }, 300 );
    }

    render() {
        return (
            <div ref={this.myRef}>
                <div ref={(mount) => { this.mount = mount }}/>
            </div>
        )
    }
}

export default Scene;