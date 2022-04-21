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
        
        const ambientLight = new THREE.AmbientLight('#444444');
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight( '#aa4444', 1 );
        pointLight1.position.set( 0, 50, 0 );
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight( '#4444aa', 1 );
        pointLight2.position.set( 0, -50, 0 );
        scene.add(pointLight2);

        const orbitObj_geo = new THREE.IcosahedronGeometry(0.2, 0);
        const orbitObj_mat = new THREE.MeshLambertMaterial({ color: '#aaaaaa' });
        const orbitObj1 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        scene.add(orbitObj1);
        this.orbitObj1 = orbitObj1;
        const orbitObj2 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        scene.add(orbitObj2);
        this.orbitObj2 = orbitObj2;
        const orbitObj3 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        scene.add(orbitObj3);
        this.orbitObj3 = orbitObj3;
        const orbitObj4 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        scene.add(orbitObj4);
        this.orbitObj4 = orbitObj4;
        const orbitObj5 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        scene.add(orbitObj5);
        this.orbitObj5 = orbitObj5;
        const orbitObj6 = new THREE.Mesh(orbitObj_geo, orbitObj_mat);
        scene.add(orbitObj6);
        this.orbitObj6 = orbitObj6;

        const orbitLin_geo = new THREE.IcosahedronGeometry(0.4, 0);
        const orbitLin_mat = new THREE.MeshLambertMaterial({ color: '#888888' });
        const orbitLin1 = new THREE.Line(orbitLin_geo, orbitLin_mat);
        scene.add(orbitLin1);
        this.orbitLin1 = orbitLin1;
        const orbitLin2 = new THREE.Line(orbitLin_geo, orbitLin_mat);
        scene.add(orbitLin2);
        this.orbitLin2 = orbitLin2;
        const orbitLin3 = new THREE.Line(orbitLin_geo, orbitLin_mat);
        scene.add(orbitLin3);
        this.orbitLin3 = orbitLin3;
        const orbitLin4 = new THREE.Line(orbitLin_geo, orbitLin_mat);
        scene.add(orbitLin4);
        this.orbitLin4 = orbitLin4;
        const orbitLin5 = new THREE.Line(orbitLin_geo, orbitLin_mat);
        scene.add(orbitLin5);
        this.orbitLin5 = orbitLin5;
        const orbitLin6 = new THREE.Line(orbitLin_geo, orbitLin_mat);
        scene.add(orbitLin6);
        this.orbitLin6 = orbitLin6;
        
        ///

        let shockwaveEffect = new POSTPROCESSING.ShockWaveEffect(camera, new THREE.Vector3(0,0,0), {
            speed: 0.5,
			maxRadius: 1,
			waveSize: 0.3,
			amplitude: 0.1
        });
        this.shockwaveEffect = shockwaveEffect;
        let smaaEffect = new POSTPROCESSING.SMAAEffect();
        let renderPass = new POSTPROCESSING.RenderPass(scene, camera);
        let effectPass = new POSTPROCESSING.EffectPass(camera, shockwaveEffect);
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

        let height = this.renderer.domElement.scrollHeight * 2.5;
        let scrollY = window.scrollY - height + getScreenHeight() / 2;
        this.camera.position.y = -scrollY / height * 4;

        let rotationY_radians = Math.atan(-(this.camera.position.y * 2) / this.camera.position.z);
        this.camera.rotation.x = rotationY_radians;

        //>>>>>>>> ANIMATION SETUP

        let t = Date.now() % 1000000 / 500000 * Math.PI;

        let t1 = t*8 + Math.PI*0.3
        this.orbitObj1.position.set(
            5*Math.cos(t1)*Math.sin(Math.tan(t1)+Math.PI), 
            -Math.cos(t1)*Math.sin(Math.tan(t1)+Math.PI), 
            5*Math.cos(t1)*Math.cos(Math.tan(t1)+Math.PI));
        this.orbitObj2.position.set(
            5*Math.cos(t1)*Math.sin(Math.tan(t1)), 
            -Math.cos(t1)*Math.sin(Math.tan(t1)), 
            5*Math.cos(t1)*Math.cos(Math.tan(t1)));
        this.orbitObj1.rotation.x += 0.03;
        this.orbitObj1.rotation.y -= 0.02;
        this.orbitObj2.rotation.x -= 0.04;
        this.orbitObj2.rotation.y += 0.01;
        this.orbitLin1.position.set(
            5*Math.cos(t1)*Math.sin(Math.tan(t1)+Math.PI), 
            -Math.cos(t1)*Math.sin(Math.tan(t1)+Math.PI), 
            5*Math.cos(t1)*Math.cos(Math.tan(t1)+Math.PI));
        this.orbitLin2.position.set(
            5*Math.cos(t1)*Math.sin(Math.tan(t1)), 
            -Math.cos(t1)*Math.sin(Math.tan(t1)), 
            5*Math.cos(t1)*Math.cos(Math.tan(t1)));
        this.orbitLin1.rotation.x -= 0.02;
        this.orbitLin1.rotation.y -= 0.05;
        this.orbitLin2.rotation.x += 0.01;
        this.orbitLin2.rotation.y += 0.03;


        let t2 = t*17 + Math.PI*0.9
        this.orbitObj3.position.set(
            8*Math.cos(t2)*Math.sin(-Math.tan(t2)+Math.PI), 
            2*Math.cos(t2)*Math.sin(-Math.tan(t2)+Math.PI), 
            8*Math.cos(t2)*Math.cos(-Math.tan(t2)+Math.PI));
        this.orbitObj4.position.set(
            8*Math.cos(t2)*Math.sin(-Math.tan(t2)), 
            2*Math.cos(t2)*Math.sin(-Math.tan(t2)), 
            8*Math.cos(t2)*Math.cos(-Math.tan(t2)));
        this.orbitObj3.rotation.x += 0.05;
        this.orbitObj3.rotation.y -= 0.02;
        this.orbitObj4.rotation.x -= 0.03;
        this.orbitObj4.rotation.y += 0.02;
        this.orbitLin3.position.set(
            8*Math.cos(t2)*Math.sin(-Math.tan(t2)+Math.PI), 
            2*Math.cos(t2)*Math.sin(-Math.tan(t2)+Math.PI), 
            8*Math.cos(t2)*Math.cos(-Math.tan(t2)+Math.PI));
        this.orbitLin4.position.set(
            8*Math.cos(t2)*Math.sin(-Math.tan(t2)), 
            2*Math.cos(t2)*Math.sin(-Math.tan(t2)), 
            8*Math.cos(t2)*Math.cos(-Math.tan(t2)));
        this.orbitLin3.rotation.x -= 0.01;
        this.orbitLin3.rotation.y -= 0.05;
        this.orbitLin4.rotation.x += 0.01;
        this.orbitLin4.rotation.y += 0.03;

        let t3 = t*5 + Math.PI*-0.5
        this.orbitObj5.position.set(
            12*Math.cos(t3)*Math.sin(Math.tan(t3)+Math.PI), 
            -3*Math.cos(t3)*Math.sin(Math.tan(t3)+Math.PI), 
            12*Math.cos(t3)*Math.cos(Math.tan(t3)+Math.PI));
        this.orbitObj6.position.set(
            12*Math.cos(t3)*Math.sin(Math.tan(t3)), 
            -3*Math.cos(t3)*Math.sin(Math.tan(t3)), 
            12*Math.cos(t3)*Math.cos(Math.tan(t3)));
        this.orbitObj5.rotation.x -= 0.01;
        this.orbitObj5.rotation.y -= 0.06;
        this.orbitObj6.rotation.x += 0.01;
        this.orbitObj6.rotation.y += 0.02;
        this.orbitLin5.position.set(
            12*Math.cos(t3)*Math.sin(Math.tan(t3)+Math.PI), 
            -3*Math.cos(t3)*Math.sin(Math.tan(t3)+Math.PI), 
            12*Math.cos(t3)*Math.cos(Math.tan(t3)+Math.PI));
        this.orbitLin6.position.set(
            12*Math.cos(t3)*Math.sin(Math.tan(t3)), 
            -3*Math.cos(t3)*Math.sin(Math.tan(t3)), 
            12*Math.cos(t3)*Math.cos(Math.tan(t3)));
        this.orbitLin5.rotation.x -= 0.04;
        this.orbitLin5.rotation.y -= 0.02;
        this.orbitLin6.rotation.x += 0.02;
        this.orbitLin6.rotation.y += 0.03;

        if (Math.abs(Math.cos(t1)) < 0.03 || 
            Math.abs(Math.cos(t2)) < 0.03 ||
            Math.abs(Math.cos(t3)) < 0.03) {
            this.shockwaveEffect.explode();
        }

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