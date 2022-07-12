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
        
        const ambientLight = new THREE.AmbientLight('#444444');
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight( '#aa8844', 1 );
        pointLight1.position.set( 0, 50, 0 );
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight( '#662288', 1 );
        pointLight2.position.set( 0, -50, 0 );
        scene.add(pointLight2);

        const orbitObj_geo = new THREE.IcosahedronGeometry(0.2, 0);
        const orbitObj_mat = new THREE.MeshLambertMaterial({ color: '#cccccc' });
        const orbitObj1 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        this.orbitObj1 = orbitObj1;
        const orbitObj2 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        this.orbitObj2 = orbitObj2;

        const focusObj_geo = new THREE.IcosahedronGeometry(0.4, 0);
        const focusObj_mat = new THREE.MeshLambertMaterial({ color: '#666666' });
        const focusObj1 = new THREE.Mesh(focusObj_geo, focusObj_mat);
        focusObj1.position.x = 5;
        const focusObj2 = new THREE.Mesh(focusObj_geo, focusObj_mat);
        focusObj2.position.x = -5;

        const pivot_geo = new THREE.PlaneGeometry( 0, 0 );
        const pivot_mat = new THREE.LineBasicMaterial({ color: '#cccccc' });
        const pivot1 = new THREE.Line(pivot_geo, pivot_mat);
        this.pivot1 = pivot1;
        pivot1.add(orbitObj1);
        pivot1.add(orbitObj2);
        pivot1.add(focusObj1);
        pivot1.add(focusObj2);

        const ringLin1_geo = new THREE.TorusGeometry( 3, 1, 12, 42 );
        const ringLin1_mat = new THREE.LineBasicMaterial({
            color: '#ffffff', 
            transparent: true, 
            opacity: 0.06});
        const ringLin1 = new THREE.Line(ringLin1_geo, ringLin1_mat);
        const ringLin2_geo = new THREE.TorusGeometry( 3, 0.3, 6, 28 );
        const ringLin2_mat = new THREE.LineBasicMaterial({
            color: '#ffccaa', 
            transparent: true, 
            opacity: 0.2});
        const ringLin2 = new THREE.Line(ringLin2_geo, ringLin2_mat);
        const pivot2 = new THREE.Line(pivot_geo, pivot_mat);
        pivot2.rotation.set(0, Math.PI/2, 0);
        pivot2.add(ringLin1);
        pivot2.add(ringLin2);
        pivot1.add(pivot2);
        this.ringLin1 = ringLin1;
        this.ringLin2 = ringLin2;
        scene.add(pivot1);

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

        let t = Date.now() % 500000 / 250000 * Math.PI;

        this.orbitObj1.position.set(8*Math.sin(t*10), 0, 4*Math.sin(t*20));
        this.orbitObj2.position.set(8*Math.sin(t*10 + Math.PI), 0, 4*Math.sin(t*20 + Math.PI));
        this.pivot1.rotation.set(0.3*Math.sin(t), t, 0.3*Math.cos(t));
        this.ringLin1.rotation.z -= 0.002;
        this.ringLin2.rotation.z += 0.005;

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