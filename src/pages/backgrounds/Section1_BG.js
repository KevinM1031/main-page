import { Component, createRef } from 'react';
import * as THREE from 'three';
import { getScreenHeight } from '../../components/ui/Window';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

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
        renderer.setClearColor('#151515');
        renderer.setSize(width, height);

        //>>>>>>>> SCENE SETUP
        
        const ambientLight = new THREE.AmbientLight('#444444');
        scene.add(ambientLight);

        const pointLight = new THREE.PointLight( '#888888', 1 );
        pointLight.position.set( 30, 50, 10 );
        scene.add(pointLight);

        const centerObj_geo = new THREE.BoxGeometry(1.5, 1.5, 1.5);
        const centerObj_mat = new THREE.MeshLambertMaterial({ color: '#666688' });
        const centerObj = new THREE.Mesh(centerObj_geo, centerObj_mat);
        centerObj.rotation.set( Math.PI/4, Math.PI/4, Math.PI/2 );
        scene.add(centerObj);
        this.centerObj = centerObj;

        const orbitObj1_geo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        const orbitObj1 = new THREE.Mesh(orbitObj1_geo, centerObj_mat);
        orbitObj1.rotation.set( Math.PI/4, Math.PI/4, Math.PI/2 );
        scene.add(orbitObj1);
        this.orbitObj1 = orbitObj1;

        const orbitObj2_geo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        const orbitObj2 = new THREE.Mesh(orbitObj2_geo, centerObj_mat);
        orbitObj2.rotation.set( Math.PI/4, Math.PI, Math.PI/2 );
        scene.add(orbitObj2);
        this.orbitObj2 = orbitObj2;

        const orbitObj3_geo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
        const orbitObj3 = new THREE.Mesh(orbitObj3_geo, centerObj_mat);
        orbitObj3.rotation.set( Math.PI/2, Math.PI/4, Math.PI );
        scene.add(orbitObj3);
        this.orbitObj3 = orbitObj3;

        const ringObj1_geo = new THREE.CylinderGeometry(4.5, 4.5, 0.2, 32, 1, true);
        const ringObj1_mat = new THREE.LineBasicMaterial({ color: '#333344' });
        const ringObj1 = new THREE.Line(ringObj1_geo, ringObj1_mat);
        scene.add(ringObj1);
        this.ringObj1 = ringObj1;

        const ringObj2_geo = new THREE.CylinderGeometry(3, 3, 0.2, 24, 1, true);
        const ringObj2 = new THREE.Line(ringObj2_geo, ringObj1_mat);
        scene.add(ringObj2);
        this.ringObj2 = ringObj2;

        const loader = new GLTFLoader();
        loader.load('../../images/land.glb', function (gltf) {
            gltf.scene.traverse(function(node) { 
                if (node instanceof THREE.Mesh) { 
                    node.position.set(0, -1, 0);
                    node.castShadow = true;
                    node.receiveShadow = true;
                } 
            });
            scene.add( gltf.scene );
        }, undefined, function (error) {
            console.error(error);
        });

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

        let height = this.renderer.domElement.scrollHeight * 1.5;
        let scrollY = window.scrollY - height + getScreenHeight() / 2;
        this.camera.position.y = -scrollY / height * 4;

        let rotationY_radians = Math.atan(-(this.camera.position.y * 2) / this.camera.position.z);
        this.camera.rotation.x = rotationY_radians;

        //>>>>>>>> ANIMATION SETUP

        let t = Date.now() % 50000 / 25000 * Math.PI;

        this.centerObj.rotation.x += 0.01;
        this.centerObj.rotation.y += 0.01;
        this.centerObj.rotation.z += 0.01;

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

        this.ringObj1.rotation.set(0.1*Math.sin(t), -t, 0.4*Math.cos(t));
        this.ringObj2.rotation.set(Math.PI, -3*t, 0.4*Math.cos(t));

        //////////////////////////

        this.renderScene();
        setTimeout( () => {
            this.frameId = window.requestAnimationFrame(this.animate);
        }, 1000 / 40 );
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
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

export default Scene;