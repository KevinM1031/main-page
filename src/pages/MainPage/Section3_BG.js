import { Component, createRef } from 'react';
import * as THREE from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';


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

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.shadowMap.enabled = true;
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor('#151515');
        renderer.setSize(width, height);

        ////////////////////////////////

        // Post-processing inits
        const composer = new EffectComposer(renderer);

        var renderPass = new RenderPass(scene, camera);
        var copyPass = new ShaderPass( CopyShader );
        copyPass.renderToScreen = true;

        const renderTargetParameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            stencilBuffer: false
        };

        // save pass
        const savePass = new SavePass(
            new THREE.WebGLRenderTarget(
                width,
                height,
                renderTargetParameters
            )
        );

        // blend pass
        const blendPass = new ShaderPass(BlendShader, "tDiffuse1");
        blendPass.uniforms["tDiffuse2"].value = savePass.renderTarget.texture;
        blendPass.uniforms["mixRatio"].value = 0.3;

        // output pass
        const outputPass = new ShaderPass(CopyShader);
        outputPass.renderToScreen = true;

        // adding passes to composer
        composer.addPass(renderPass);
        composer.addPass(blendPass);
        composer.addPass(savePass);
        composer.addPass(outputPass);

        this.composer = composer;

        //>>>>>>>> SCENE SETUP
        
        const ambientLight = new THREE.AmbientLight('#ffffff');
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight( '#ffffff', 1 );
        pointLight.position.set( 30, 50, 10 );
        scene.add(pointLight);

        const centerObj_geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const centerObj_mat = new THREE.MeshLambertMaterial({ color: '#433F81' });
        const centerObj = new THREE.Mesh(centerObj_geo, centerObj_mat);
        scene.add(centerObj);
        this.centerObj = centerObj;

        const orbitObj1_geo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        const orbitObj1_mat = new THREE.MeshLambertMaterial({ color: '#433F81' });
        const orbitObj1 = new THREE.Mesh(orbitObj1_geo, orbitObj1_mat);
        scene.add(orbitObj1);
        this.orbitObj1 = orbitObj1;

        const orbitObj2_geo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        const orbitObj2_mat = new THREE.MeshLambertMaterial({ color: '#433F81' });
        const orbitObj2 = new THREE.Mesh(orbitObj2_geo, orbitObj2_mat);
        scene.add(orbitObj2);
        this.orbitObj2 = orbitObj2;

        const orbitObj3_geo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        const orbitObj3_mat = new THREE.MeshLambertMaterial({ color: '#433F81' });
        const orbitObj3 = new THREE.Mesh(orbitObj3_geo, orbitObj3_mat);
        scene.add(orbitObj3);
        this.orbitObj3 = orbitObj3;

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
        this.composer.render();

        let height = this.renderer.domElement.scrollHeight * 1.5;
        let scrollY = window.scrollY - height + window.innerHeight / 2;
        this.camera.position.y = -scrollY / height * 4;

        let rotationY_radians = Math.atan(-(this.camera.position.y * 2) / this.camera.position.z);
        this.camera.rotation.x = rotationY_radians;

        //>>>>>>>> ANIMATION SETUP

        let t = Date.now() % 5000 / 2500 * Math.PI;

        this.centerObj.rotation.y += 0.05;

        this.orbitObj1.position.set(
            2*Math.sin(t+Math.PI*0.9), 
            Math.cos(t-Math.PI*0.3), 
            2*Math.cos(t+Math.PI*0.9));

        this.orbitObj2.position.set(
            4*Math.sin(t-Math.PI*0.2), 
            Math.cos(t+Math.PI*0.5), 
            4*Math.cos(t-Math.PI*0.2));

        this.orbitObj3.position.set(
            6*Math.sin(t+Math.PI*0.6), 
            Math.cos(t-Math.PI*0.3), 
            6*Math.cos(t+Math.PI*0.6));

        //////////////////////////

        //this.renderScene();
        setTimeout( () => {
            this.frameId = window.requestAnimationFrame(this.animate);
        }, 1000 / 60 );
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        setTimeout( () => {
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

export default Scene;