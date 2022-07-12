import { Component, createRef } from 'react';
import * as THREE from 'three';
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

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor('#151515');
        renderer.setSize(width, height);

        //>>>>>>>> SCENE SETUP

        const ambientLight = new THREE.AmbientLight('#333333');
        scene.add(ambientLight);

        const orbitObj_geo = new THREE.IcosahedronGeometry(0.07, 0);
        const orbitObj_mat = new THREE.MeshLambertMaterial({ emissive: '#ffffff' });
        const orbitObj1 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        this.orbitObj1 = orbitObj1;
        const orbitObj2 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        this.orbitObj2 = orbitObj2;
        const orbitObj3 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        this.orbitObj3 = orbitObj3;

        const coneObj_geo = new THREE.ConeGeometry( 0.5, 1.5, 8, 1, true );
        const coneObj_mat = new THREE.LineBasicMaterial({
            color: '#ffffff', 
            transparent: true, 
            opacity: 0.1});
        const coneObj1 = new THREE.Line(coneObj_geo, coneObj_mat);
        coneObj1.rotation.x = Math.PI/2;
        coneObj1.position.z = -2;
        this.coneObj1 = coneObj1;

        const coneObj2 = new THREE.Line(coneObj_geo, coneObj_mat);
        coneObj2.rotation.x = -Math.PI/2;
        coneObj2.position.z = 2;
        this.coneObj2 = coneObj2;

        const ringLin1_geo = new THREE.TorusGeometry( 3, 0.3, 10, 36 );
        const ringLin1_mat = new THREE.LineBasicMaterial({
            color: '#664488', 
            transparent: true, 
            opacity: 0.3});
        const ringLin1 = new THREE.Line(ringLin1_geo, ringLin1_mat);
        ringLin1.add(orbitObj1);
        ringLin1.add(orbitObj2);
        ringLin1.add(orbitObj3);
        ringLin1.add(coneObj1);
        ringLin1.add(coneObj2);
        this.ringLin1 = ringLin1;

        const ringLin2_geo = new THREE.TorusGeometry( 3, 0.7, 10, 36 );
        const ringLin2_mat = new THREE.LineBasicMaterial({
            color: '#6666aa', 
            transparent: true, 
            opacity: 0.1});
        const ringLin2 = new THREE.Line(ringLin2_geo, ringLin2_mat);
        ringLin2.add(ringLin1);
        this.ringLin2 = ringLin2;

        const ringLin3_geo = new THREE.RingGeometry( 4, 6, 36, 1 );
        const ringLin3_mat = new THREE.LineBasicMaterial({
            color: '#888888', 
            transparent: true, 
            opacity: 0.06});
        const ringLin3 = new THREE.Line(ringLin3_geo, ringLin3_mat);
        ringLin3.rotation.x = Math.PI/2;
        ringLin3.add(ringLin2);
        scene.add(ringLin3);
        this.ringLin3 = ringLin3;

        

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

        this.orbitObj1.position.set(3*Math.sin(t*16), 3*Math.cos(t*16), 0);
        this.orbitObj2.position.set(3*Math.sin(t*16+Math.PI*2/3), 3*Math.cos(t*16+Math.PI*2/3), 0);
        this.orbitObj3.position.set(3*Math.sin(t*16+Math.PI*4/3), 3*Math.cos(t*16+Math.PI*4/3), 0);

        this.coneObj1.rotation.set(Math.PI/2, -t*140, 0);
        this.coneObj2.rotation.set(-Math.PI/2, t*140, 0);

        this.ringLin1.rotation.set(0, 0, t*9);
        this.ringLin2.rotation.set(0, 0, t*-7);
        this.ringLin3.rotation.set(-0.2*Math.sin(t) + Math.PI/2, -0.1*Math.cos(t), t);

        //////////////////////////

        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
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