import { Component, createRef } from 'react';
import * as THREE from 'three';
import {RenderPass} from 'three/examples/jsm/postprocessing/RenderPass';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer.js';
import {SavePass} from 'three/examples/jsm/postprocessing/SavePass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass.js';
import {BlendShader} from 'three/examples/jsm/shaders/BlendShader.js';
import {CopyShader} from 'three/examples/jsm/shaders/CopyShader.js';
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

        const ambientLight = new THREE.AmbientLight('#888888');
        scene.add(ambientLight);



        const centerObj1_geo = new THREE.IcosahedronGeometry(0.2, 0);
        const centerObj1_mat = new THREE.LineBasicMaterial({ color: '#ffccaa' });
        const centerObj1 = new THREE.Line(centerObj1_geo, centerObj1_mat);
        const pointLight1 = new THREE.PointLight( '#775533', 2 );
        centerObj1.add(pointLight1);
        scene.add(centerObj1);
        this.centerObj1 = centerObj1;

        const centerObj2_geo = new THREE.IcosahedronGeometry(0.6, 1);
        const centerObj2_mat = new THREE.LineBasicMaterial({ color: '#aa8866' });
        const centerObj2 = new THREE.Line(centerObj2_geo, centerObj2_mat);
        scene.add(centerObj2);
        this.centerObj2 = centerObj2;

        const centerObj3_geo = new THREE.IcosahedronGeometry(3, 1);
        const centerObj3_mat = new THREE.LineBasicMaterial({ color: '#665544' });
        const centerObj3 = new THREE.Line(centerObj3_geo, centerObj3_mat);
        scene.add(centerObj3);
        this.centerObj3 = centerObj3;

        const orbitObj_geo = new THREE.DodecahedronGeometry(0.15, 0);
        const orbitObj_mat = new THREE.MeshLambertMaterial({ color: '#aa88ff' });
        const pivot_geo = new THREE.PlaneGeometry( 0, 0 );
        const pivot_mat = new THREE.LineBasicMaterial();

        const mainPivot = new THREE.Line(pivot_geo, pivot_mat);

        const pivot1 = new THREE.Line(pivot_geo, pivot_mat);
        const orbitObj1 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        pivot1.position.set(15, 1, 50);
        pivot1.rotation.set(-Math.atan(1/50), Math.atan(15/50), -Math.atan(50/1));
        pivot1.add(orbitObj1);
        mainPivot.add(pivot1);
        this.orbitObj1 = orbitObj1;

        const pivot2 = new THREE.Line(pivot_geo, pivot_mat);
        const orbitObj2 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        pivot2.position.set(-40, 5, -30);
        pivot2.rotation.set(-Math.atan(5/-30), Math.atan(-40/-30), -Math.atan(-30/5));
        pivot2.add(orbitObj2);
        mainPivot.add(pivot2);
        this.orbitObj2 = orbitObj2;

        const pivot3 = new THREE.Line(pivot_geo, pivot_mat);
        const orbitObj3 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        pivot3.position.set(70, -6, -10);
        pivot3.rotation.set(-Math.atan(-6/-10), Math.atan(70/-10), -Math.atan(-10/-6));
        pivot3.add(orbitObj3);
        mainPivot.add(pivot3);
        this.orbitObj3 = orbitObj3;

        const pivot4 = new THREE.Line(pivot_geo, pivot_mat);
        const orbitObj4 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        pivot4.position.set(-130, -2, 90);
        pivot4.rotation.set(-Math.atan(-2/90), Math.atan(-130/90), -Math.atan(90/-2));
        pivot4.add(orbitObj4);
        mainPivot.add(pivot4);
        this.orbitObj4 = orbitObj4;

        const pivot5 = new THREE.Line(pivot_geo, pivot_mat);
        const orbitObj5 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        pivot5.position.set(-20, -3, -10);
        pivot5.rotation.set(-Math.atan(-3/-10), Math.atan(-20/-10), -Math.atan(-10/-3));
        pivot5.add(orbitObj5);
        mainPivot.add(pivot5);
        this.orbitObj5 = orbitObj5;

        scene.add(mainPivot);
        this.mainPivot = mainPivot;

        ///

        const renderTargetParameters = {
            minFilter: THREE.LinearFilter,
            magFilter: THREE.LinearFilter,
            stencilBuffer: false
        };

        const savePass = new SavePass(
            new THREE.WebGLRenderTarget(
                width,
                height,
                renderTargetParameters
            )
        );
        this.savePass = savePass;
        
        const blendPass = new ShaderPass(BlendShader, "tDiffuse1");
        blendPass.uniforms["tDiffuse2"].value = savePass.renderTarget.texture;
        blendPass.uniforms["mixRatio"].value = 0.4;
        const outputPass = new ShaderPass(CopyShader);
        outputPass.renderToScreen = true;
        const renderPass = new RenderPass(scene, camera);
        const composer = new EffectComposer(renderer);
        composer.addPass(renderPass);
        composer.addPass(blendPass);
        composer.addPass(savePass);
        composer.addPass(outputPass);
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

        let height = this.renderer.domElement.scrollHeight * 2.5;
        let scrollY = window.scrollY - height + getScreenHeight() / 2;
        this.camera.position.y = -scrollY / height * 4;

        let rotationY_radians = Math.atan(-(this.camera.position.y * 2) / this.camera.position.z);
        this.camera.rotation.x = rotationY_radians;

        //>>>>>>>> ANIMATION SETUP

        let t = Date.now() % 50000 / 25000 * Math.PI;

        this.orbitObj1.position.set(3*Math.sin(t*5+Math.PI*0.2), 0, 55*Math.cos(t*2+Math.PI*0.2));
        this.orbitObj2.position.set(4*Math.sin(t*3+Math.PI*0.7), 0, 55*Math.cos(t*3+Math.PI*0.7));
        this.orbitObj3.position.set(5*Math.sin(t*4-Math.PI*0.5), 0, 75*Math.cos(t*4-Math.PI*0.5));
        this.orbitObj4.position.set(7*Math.sin(t*5+Math.PI*0.1), 0, 160*Math.cos(t*5+Math.PI*0.1));
        this.orbitObj5.position.set(2*Math.sin(t*6-Math.PI*0.6), 0, 25*Math.cos(t*6-Math.PI*0.6));

        this.mainPivot.rotation.set(0.1*Math.sin(t), t, 0.1*Math.cos(t));
        this.centerObj1.rotation.set(t*20, t*30, t*45);
        this.centerObj2.rotation.set(-t*4, -t*6, -t*2);
        this.centerObj3.rotation.set(2*t, -t, t);

        //////////////////////////

        this.renderScene();
        setTimeout( () => {
            this.frameId = window.requestAnimationFrame(this.animate);
        }, 1000 / 40 );
    }

    renderScene() {
        this.composer.render();
    }

    resize() {
        setTimeout( () => {
            if (!this.renderer || !this.camera) return;
            const renderTargetParameters = {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.LinearFilter,
                stencilBuffer: false
            };
            this.savePass = new SavePass(
                new THREE.WebGLRenderTarget(
                    this.props.width,
                    this.props.height,
                    renderTargetParameters
                )
            );

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