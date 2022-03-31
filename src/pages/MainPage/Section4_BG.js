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
        
        const ambientLight = new THREE.AmbientLight('#444444');
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight( '#00aa88', 1 );
        pointLight1.position.set( -80, 50, 40 );
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight( '#550077', 1 );
        pointLight2.position.set( 20, -30, 10 );
        scene.add(pointLight2);

        const pivot_geo = new THREE.PlaneGeometry( 0, 0 );
        const pivot_mat = new THREE.LineBasicMaterial();
        const pivot1_geo = new THREE.PlaneGeometry( 0, 0 );
        const pivot1_mat = new THREE.LineBasicMaterial();
        const pivot1 = new THREE.Line(pivot1_geo, pivot1_mat);
        const orbitObj1_geo = new THREE.TetrahedronGeometry(0.3, 0);
        const orbitObj1_mat = new THREE.MeshLambertMaterial();
        this.orbitObj1_mat = orbitObj1_mat;
        for (let i = 0; i < 16; i++) {
            const orbitObj1 = new THREE.Mesh(orbitObj1_geo, orbitObj1_mat);
            orbitObj1.rotation.set(-2, 2, -1);
            orbitObj1.position.set(2.5*Math.sin(i/16*Math.PI*2), 0, 2.5*Math.cos(i/16*Math.PI*2));
            pivot1.add(orbitObj1);
        }
        this.pivot1 = pivot1;
        const ring1 = new THREE.Line(pivot_geo, pivot_mat);
        ring1.rotation.set(-0.8, 0, 0.5);
        ring1.add(pivot1);
        scene.add(ring1);
        this.ring1 = ring1;

        const pivot2_geo = new THREE.PlaneGeometry( 0, 0 );
        const pivot2_mat = new THREE.LineBasicMaterial();
        const pivot2 = new THREE.Line(pivot2_geo, pivot2_mat);
        const orbitObj2_geo = new THREE.TetrahedronGeometry(0.5, 0);
        const orbitObj2_mat = new THREE.MeshLambertMaterial();
        this.orbitObj2_mat = orbitObj2_mat;
        for (let i = 0; i < 16; i++) {
            const orbitObj2 = new THREE.Mesh(orbitObj2_geo, orbitObj2_mat);
            orbitObj2.rotation.set(1, 2, -3);
            orbitObj2.position.set(5*Math.sin(i/16*Math.PI*2), 0, 5*Math.cos(i/16*Math.PI*2));
            pivot2.add(orbitObj2);
        }
        this.pivot2 = pivot2;
        const ring2 = new THREE.Line(pivot_geo, pivot_mat);
        ring2.rotation.set(0.1, 0, -0.2);
        ring2.add(pivot2);
        scene.add(ring2);
        this.ring2 = ring2;

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

        let t = Date.now() % 400000 / 200000 * Math.PI;

        this.pivot1.rotation.set(0, Math.tan(t*4), 0);
        this.pivot2.rotation.set(0, Math.tan(t-Math.PI*0.3), 0);

        let c1 = Math.floor(Math.pow(-Math.sin(t*4), 6)*200)+55;
        this.orbitObj1_mat.color.set('rgb('+c1+','+c1+','+c1+')');
        let c2 = Math.floor(Math.pow(-Math.sin(t-Math.PI*0.3), 6)*200)+55
        this.orbitObj2_mat.color.set('rgb('+c2+','+c2+','+c2+')');

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