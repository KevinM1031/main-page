import { Component, createRef } from 'react';
import * as THREE from 'three';

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
        
        const ambientLight = new THREE.AmbientLight('#666666');
        scene.add(ambientLight);

        const centerObj_geo = new THREE.TorusKnotGeometry( 1.5, 0.4, 100, 12, 3, 4 );
        const centerObj_mat = new THREE.LineBasicMaterial({ 
            color: '#664466',
            transparent: true,
            opacity: 0.3});
        const centerObj = new THREE.Line(centerObj_geo, centerObj_mat);
        scene.add(centerObj);
        this.centerObj = centerObj;

        const sheetLin_geo = new THREE.PlaneGeometry( 10, 10, 20, 20 );
        const sheetLin_mat = new THREE.LineBasicMaterial({ color: '#444444', transparent: true });
        const sheetLin1 = new THREE.Line(sheetLin_geo, sheetLin_mat);
        sheetLin1.rotation.set(Math.PI/2, 0, 0);
        scene.add(sheetLin1);
        this.sheetLin1 = sheetLin1;
        const sheetLin2 = new THREE.Line(sheetLin_geo, sheetLin_mat);
        sheetLin2.rotation.set(Math.PI/2, 0, 0);
        scene.add(sheetLin2);
        this.sheetLin2 = sheetLin2;

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
        let scrollY = window.scrollY - height + window.innerHeight / 2;
        this.camera.position.y = -scrollY / height * 4;

        let rotationY_radians = Math.atan(-(this.camera.position.y * 2) / this.camera.position.z);
        this.camera.rotation.x = rotationY_radians;

        //>>>>>>>> ANIMATION SETUP

        let t = Date.now() % 30000 / 15000 * Math.PI;

        this.centerObj.rotation.x += 0.01;
        this.centerObj.rotation.y += 0.02;
        this.centerObj.rotation.z -= 0.01;

        this.sheetLin1.material.opacity = Math.pow(Math.cos(t*2)/2+0.5, 6);
        this.sheetLin1.position.y = 4*Math.cos(t+Math.PI/2);
        this.sheetLin2.material.opacity = Math.pow(Math.cos(t*2)/2+0.5, 6);
        this.sheetLin2.position.y = -4*Math.cos(t+Math.PI/2);

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