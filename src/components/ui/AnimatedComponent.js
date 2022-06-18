import { useState, useEffect, useRef } from "react";
import { Fade, Slide, Zoom } from '@material-ui/core';

export function FadingComponent(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.disconnect();  // clean up
    }, []);

    return (
        <div ref={domRef}>
            <Fade timeout={props.duration} in={isVisible} style={{ transitionDelay: !props.delay ? '0ms' : props.delay + 'ms' }}>
                <div>
                    {props.children}
                </div>
            </Fade>
        </div>
    );
};

export function SlidingComponent(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.disconnect();  // clean up
    }, []);

    return (
        <div ref={domRef}>
            <Slide direction={props.direction} timeout={props.duration} in={isVisible} style={{ transitionDelay: !props.delay ? '0ms' : props.delay + 'ms' }}>
                <div>
                    {props.children}
                </div>
            </Slide>
        </div>
    );
};

export function SlidingAndFadingComponent(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.disconnect();  // clean up
    }, []);

    return (
        <div ref={domRef}>
            <Slide direction={props.direction} timeout={props.duration} in={isVisible} style={{ transitionDelay: !props.delay ? '0ms' : props.delay + 'ms' }}>
                <div style={{height: '100%'}}>
                    <Fade timeout={props.duration} in={isVisible} style={{ transitionDelay: !props.delay ? '0ms' : props.delay + 'ms' }}>
                        <div>
                            {props.children}
                        </div>
                    </Fade>
                </div>
            </Slide>
        </div>
    );
};

export function ZoomingComponent(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.disconnect();  // clean up
    }, []);

    return (
        <div ref={domRef}>
            <Zoom timeout={props.duration} in={isVisible} style={{ transitionDelay: !props.delay ? '0ms' : props.delay + 'ms' }}>
                <div>
                    {props.children}
                </div>
            </Zoom>
        </div>
    );
};