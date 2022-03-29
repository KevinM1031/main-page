import { Component, createRef } from 'react';
import * as THREE from 'three';
import SectionBG from './SectionBG.js';

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
            75,
            width / height,
            0.1,
            1000
        );

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
        const cube = new THREE.Mesh(geometry, material);

        camera.position.z = 4;
        scene.add(cube);
        renderer.setClearColor('#151515');
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.material = material;
        this.cube = cube;

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
        cancelAnimationFrame(this.frameId);
    }

    animate() {

        this.cube.rotation.x += 0.05;
        this.cube.rotation.y += 0.05;

        this.renderScene();
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