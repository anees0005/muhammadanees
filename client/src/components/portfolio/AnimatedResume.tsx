import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AnimatedResumeProps {
  onClose: () => void;
}

export default function AnimatedResume({ onClose }: AnimatedResumeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    // Set solid background color
    renderer.setClearColor(0x0f172a, 1);
    
    const container = canvasRef.current.parentElement;
    const width = container?.clientWidth || window.innerWidth;
    const height = container?.clientHeight || window.innerHeight;
    
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    camera.position.z = 5;

    // Create floating particles with network connections
    const particlesCount = window.innerWidth < 768 ? 100 : 200;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    const velArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 20;
      posArray[i + 1] = (Math.random() - 0.5) * 20;
      posArray[i + 2] = (Math.random() - 0.5) * 20;
      
      velArray[i] = (Math.random() - 0.5) * 0.02;
      velArray[i + 1] = (Math.random() - 0.5) * 0.02;
      velArray[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 0.04 : 0.06,
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xd1d5db,
      transparent: true,
      opacity: 0.4,
    });

    const maxDistance = 3;
    let connections: number[] = [];

    // Initialize with some connections
    for (let i = 0; i < particlesCount; i++) {
      for (let j = i + 1; j < particlesCount; j++) {
        const i3 = i * 3;
        const j3 = j * 3;
        const dx = posArray[i3] - posArray[j3];
        const dy = posArray[i3 + 1] - posArray[j3 + 1];
        const dz = posArray[i3 + 2] - posArray[j3 + 2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (distance < maxDistance) {
          connections.push(
            posArray[i3], posArray[i3 + 1], posArray[i3 + 2],
            posArray[j3], posArray[j3 + 1], posArray[j3 + 2]
          );
        }
      }
    }

    // Always create line mesh, even if empty initially
    if (connections.length === 0) {
      connections = [0, 0, 0, 0, 0, 0]; // Dummy connection to initialize
    }
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3));
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Animation with smooth movement
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Update particle positions with smooth movement
      const positions = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i] += velArray[i] + Math.sin(elapsedTime * 0.5 + i * 0.01) * 0.002;
        positions[i + 1] += velArray[i + 1] + Math.cos(elapsedTime * 0.5 + i * 0.01) * 0.002;
        positions[i + 2] += velArray[i + 2] + Math.sin(elapsedTime * 0.3 + i * 0.02) * 0.001;
        
        // Boundary check with bounce
        if (Math.abs(positions[i]) > 10) velArray[i] *= -1;
        if (Math.abs(positions[i + 1]) > 10) velArray[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 10) velArray[i + 2] *= -1;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
      
      // Smooth rotation
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0003;
      
      // Update connections dynamically
      const newConnections: number[] = [];
      
      for (let i = 0; i < particlesCount; i++) {
        for (let j = i + 1; j < particlesCount; j++) {
          const i3 = i * 3;
          const j3 = j * 3;
          const dx = positions[i3] - positions[j3];
          const dy = positions[i3 + 1] - positions[j3 + 1];
          const dz = positions[i3 + 2] - positions[j3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < maxDistance) {
            newConnections.push(
              positions[i3], positions[i3 + 1], positions[i3 + 2],
              positions[j3], positions[j3 + 1], positions[j3 + 2]
            );
          }
        }
      }
      
      // Update line geometry with new connections
      if (newConnections.length > 0) {
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(newConnections, 3));
        lineGeometry.attributes.position.needsUpdate = true;
      } else {
        // Keep at least a dummy connection to avoid errors
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, 0], 3));
        lineGeometry.attributes.position.needsUpdate = true;
      }
      
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container?.clientWidth || window.innerWidth;
      const newHeight = container?.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
    };
  }, []);

  const handleDownload = () => {
    const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Muhammad Anees - Professional CV</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            line-height: 1.6; 
            background: #1e293b;
            color: #ffffff;
            padding: 0;
            overflow-x: hidden;
            position: relative;
            min-height: 100vh;
        }
        
        /* Ensure all text is white unless specified */
        p, li, span, div {
            color: #ffffff;
        }
        
        /* Keep cyan for headings and accents */
        h1, h2, h3, h4, .section-title, .organization, .skill-category h4 {
            color: inherit;
        }
        
        .animation-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 0;
            pointer-events: none;
        }
        
        .animation-left, .animation-right {
            position: fixed;
            top: 0;
            bottom: 0;
            width: 25%;
            height: 100vh;
            min-height: 100vh;
            max-height: 100vh;
            z-index: 1;
            pointer-events: none;
            opacity: 1;
            background: #0f172a;
        }
        
        .animation-left {
            left: 0;
            right: auto;
        }
        
        .animation-right {
            right: 0;
            left: auto;
        }
        
        @media (max-width: 1024px) {
            .animation-left, .animation-right {
                width: 20%;
            }
        }
        
        @media (max-width: 768px) {
            .animation-left, .animation-right {
                width: 15%;
            }
        }
        
        @media (min-width: 1400px) {
            .animation-left, .animation-right {
                width: 30%;
            }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(-30px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.3); }
            50% { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6); }
        }
        
        .container { 
            max-width: 1000px; 
            margin: 0 auto; 
            background: #1e293b;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7); 
            animation: fadeIn 1s ease-out;
            position: relative;
            z-index: 2;
        }
        
        @media (max-width: 768px) {
            .container {
                max-width: 100%;
            }
        }
        
        .header { 
            background: #1e293b;
            color: white; 
            padding: 50px 40px;
            text-align: center;
            position: relative;
            overflow: hidden;
            animation: slideIn 0.8s ease-out;
            border-bottom: 4px solid #06b6d4;
            box-shadow: 0 4px 20px rgba(6, 182, 212, 0.2);
        }
        
        @media (max-width: 768px) {
            .header {
                padding: 30px 20px;
            }
        }
        
        
        .header h1 { 
            font-size: 2.8em;
            margin-bottom: 15px; 
            text-shadow: 0 2px 10px rgba(6, 182, 212, 0.3);
            position: relative;
            z-index: 1;
            letter-spacing: 2px;
            font-weight: 700;
            color: #ffffff;
        }
        
        .header .tagline { 
            font-size: 1.1em;
            position: relative;
            z-index: 1;
            opacity: 0.9;
            line-height: 1.5;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 1.8em;
            }
            .header .tagline {
                font-size: 0.9em;
            }
        }
        
        .contact-bar { 
            background: #1e293b;
            padding: 25px 30px;
            display: flex; 
            justify-content: space-around; 
            flex-wrap: wrap; 
            gap: 20px;
            border-bottom: 2px solid #06b6d4;
        }
        
        @media (max-width: 768px) {
            .contact-bar {
                padding: 15px 20px;
                flex-direction: column;
                align-items: center;
                gap: 12px;
            }
            
            .contact-item {
                font-size: 0.9em;
                text-align: center;
            }
        }
        
        .contact-item { 
            display: flex; 
            align-items: center; 
            gap: 10px;
            color: #ffffff;
            animation: fadeIn 1s ease-in;
            animation-fill-mode: both;
        }
        
        .contact-item:nth-child(1) { animation-delay: 0.2s; }
        .contact-item:nth-child(2) { animation-delay: 0.4s; }
        .contact-item:nth-child(3) { animation-delay: 0.6s; }
        
        .icon { 
            color: #06b6d4; 
            font-size: 1.1em;
            font-weight: 600;
            margin-right: 8px;
        }
        
        .contact-item span:not(.icon) {
            color: #ffffff;
        }
        
        .content { 
            padding: 30px;
            background: #1e293b;
        }
        
        @media (max-width: 768px) {
            .content {
                padding: 20px 15px;
            }
        }
        
        .section { 
            margin-bottom: 35px;
            padding: 30px;
            background: #334155;
            border-left: 4px solid #06b6d4;
            border-radius: 8px;
            animation: slideIn 1s ease-in;
            animation-fill-mode: both;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }
        
        .section:hover {
            box-shadow: 0 4px 20px rgba(6, 182, 212, 0.15);
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .section {
                padding: 20px 15px;
                margin-bottom: 25px;
            }
        }
        
        .section:nth-child(1) { animation-delay: 0.1s; }
        .section:nth-child(2) { animation-delay: 0.2s; }
        .section:nth-child(3) { animation-delay: 0.3s; }
        .section:nth-child(4) { animation-delay: 0.4s; }
        
        .section-title { 
            font-size: 1.6em;
            color: #06b6d4; 
            margin-bottom: 18px; 
            border-bottom: 2px solid #06b6d4; 
            padding-bottom: 10px;
            position: relative;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            font-weight: 600;
        }
        
        @media (max-width: 768px) {
            .section-title {
                font-size: 1.3em;
                margin-bottom: 15px;
                padding-bottom: 8px;
            }
        }
        
        .section-title::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 100px;
            height: 3px;
            background: #06b6d4;
            animation: expandWidth 1s ease-out;
            box-shadow: 0 0 10px rgba(6, 182, 212, 0.5);
        }
        
        @keyframes expandWidth {
            from { width: 0; }
            to { width: 80px; }
        }
        
        .summary { 
            font-size: 1em;
            color: #ffffff; 
            line-height: 1.8;
        }
        
        @media (max-width: 768px) {
            .summary {
                font-size: 0.9em;
                line-height: 1.7;
            }
        }
        
        .skills-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); 
            gap: 20px;
        }
        
        @media (max-width: 768px) {
            .skills-grid {
                grid-template-columns: 1fr;
                gap: 15px;
            }
        }
        
        .skill-category { 
            background: #334155;
            padding: 22px; 
            border-radius: 8px; 
            border: 2px solid #06b6d4;
            transition: all 0.3s ease;
            animation: fadeIn 1s ease-in;
            animation-fill-mode: both;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 768px) {
            .skill-category {
                padding: 18px;
            }
        }
        
        .skill-category:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(6, 182, 212, 0.4);
            border-color: #06b6d4;
            background: #1e293b;
        }
        
        .skill-category h4 { 
            color: #06b6d4; 
            margin-bottom: 15px; 
            font-size: 1.3em;
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .skill-list { 
            list-style: none; 
        }
        
        .skill-list li { 
            padding: 8px 0; 
            color: #ffffff;
            position: relative;
            padding-left: 22px;
            transition: all 0.3s;
            word-wrap: break-word;
            overflow-wrap: break-word;
        }
        
        .skill-list li:hover {
            color: #ffffff;
            padding-left: 25px;
        }
        
        .skill-list li::before {
            content: '▸';
            position: absolute;
            left: 0;
            top: 8px;
            color: #06b6d4;
            font-weight: bold;
            transition: all 0.3s;
            line-height: 1.5;
        }
        
        .skill-list li:hover::before {
            color: #06b6d4;
            transform: translateX(3px);
        }
        
        @media (max-width: 768px) {
            .skill-list li {
                padding: 6px 0;
                padding-left: 20px;
                font-size: 0.9em;
            }
            
            .skill-list li::before {
                top: 6px;
                left: 0;
            }
        }
        
        .experience-item, .education-item { 
            background: #334155;
            padding: 28px; 
            margin-bottom: 22px; 
            border-radius: 8px; 
            border-left: 4px solid #06b6d4;
            transition: all 0.3s ease;
            animation: slideIn 0.8s ease-in;
            animation-fill-mode: both;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        
        @media (max-width: 768px) {
            .experience-item, .education-item {
                padding: 18px 15px;
                margin-bottom: 18px;
            }
        }
        
        .experience-item:hover, .education-item:hover {
            transform: translateX(8px);
            box-shadow: 0 6px 20px rgba(6, 182, 212, 0.3);
            border-left-width: 5px;
        }
        
        .experience-item h4, .education-item h4 { 
            color: #06b6d4; 
            font-size: 1.3em;
            margin-bottom: 10px;
            font-weight: 600;
            letter-spacing: 0.3px;
        }
        
        @media (max-width: 768px) {
            .experience-item h4, .education-item h4 {
                font-size: 1.1em;
            }
        }
        
        .organization { 
            color: #06b6d4;
            font-weight: 600; 
            margin-bottom: 6px;
            font-size: 1em;
        }
        
        @media (max-width: 768px) {
            .organization {
                font-size: 0.95em;
            }
        }
        
        .period { 
            color: #ffffff; 
            font-size: 0.9em;
            margin-bottom: 12px;
            font-style: italic;
            opacity: 0.9;
        }
        
        @media (max-width: 768px) {
            .period {
                font-size: 0.85em;
                margin-bottom: 10px;
            }
        }
        
        .footer { 
            background: #1e293b;
            color: white; 
            text-align: center; 
            padding: 30px;
            font-size: 0.9em;
            border-top: 4px solid #06b6d4;
            box-shadow: 0 -4px 20px rgba(6, 182, 212, 0.2);
        }
        
        .footer a {
            color: #06b6d4;
            text-decoration: none;
            transition: all 0.3s;
        }
        
        .footer a:hover {
            color: #0ea5e9;
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .footer {
                padding: 20px 15px;
                font-size: 0.85em;
            }
        }
        
        .footer strong {
            font-size: 1.2em;
            letter-spacing: 1px;
        }
        
        @media print {
            body { background: white; color: black; }
            .container { box-shadow: none; }
            .header { background: #1e3a5f; }
            .section-title { color: #06b6d4; }
            * { animation: none !important; }
        }
        
        /* Additional mobile optimizations */
        @media (max-width: 768px) {
            .skill-list li {
                font-size: 0.9em;
                padding: 6px 0;
                padding-left: 20px;
            }
            
            .skill-category h4 {
                font-size: 1.1em;
            }
            
            ul.skill-list {
                padding-left: 0;
                margin-left: 0;
            }
            
            .section {
                padding: 20px 15px;
            }
            
            .header h1 {
                font-size: 1.8em;
            }
            
            .header .tagline {
                font-size: 0.85em;
            }
        }
    </style>
</head>
<body>
    <canvas id="animation-left" class="animation-left"></canvas>
    <canvas id="animation-right" class="animation-right"></canvas>
    
    <div class="container">
        <div class="header">
            <h1>MUHAMMAD ANEES</h1>
            <p class="tagline">IT & Web Development Specialist | SEO & Digital Marketing Expert | Accounting & Financial Systems Professional</p>
        </div>
        
        <div class="contact-bar">
            <div class="contact-item">
                <span class="icon">@</span>
                <span>anees05it@gmail.com</span>
            </div>
            <div class="contact-item">
                <span class="icon">+</span>
                <span>+92 343 3523057</span>
            </div>
            <div class="contact-item">
                <span class="icon">•</span>
                <span>Pakistan</span>
            </div>
        </div>
        
        <div class="content">
            <div class="section">
                <h2 class="section-title">Professional Summary</h2>
                <p class="summary">
                    Versatile professional with 6+ years of experience bridging technology, business, and finance. Expert SaaS developer who built <strong>CompanyHub</strong> and <strong>ExpenseFlow</strong> - two production-ready SaaS products. Specialized in building scalable web applications with React, Next.js, TypeScript, and modern tech stacks. Published 20+ comprehensive blog articles on SaaS development, web technologies, and digital marketing. Expert in building modern websites (WordPress, Shopify, React, Next.js), driving digital marketing campaigns (SEO, paid ads, social media), managing IT operations & cybersecurity, and applying accounting principles through ACCA training. Proven track record in delivering 20+ websites, 100+ marketing campaigns, AI-powered chatbots, and production SaaS products. Seeking opportunities to leverage technical expertise and business acumen to solve complex challenges.
                </p>
            </div>
            
            <div class="section">
                <h2 class="section-title">Core Competencies</h2>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h4>Website Development</h4>
                        <ul class="skill-list">
                            <li>WordPress & WooCommerce (95%)</li>
                            <li>React & Next.js (92%)</li>
                            <li>MERN Stack Development (88%)</li>
                            <li>Three.js & Animations (85%)</li>
                            <li>HTML/CSS/JavaScript (95%)</li>
                            <li>Tailwind CSS (90%)</li>
                            <li>E-commerce Solutions (90%)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>Digital Marketing</h4>
                        <ul class="skill-list">
                            <li>Facebook & Instagram Ads (90%)</li>
                            <li>TikTok Marketing (85%)</li>
                            <li>Content Strategy (88%)</li>
                            <li>Google Analytics (90%)</li>
                            <li>Video Editing (85%)</li>
                            <li>Graphics Design (87%)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>SEO Optimization</h4>
                        <ul class="skill-list">
                            <li>On-Page SEO (95%)</li>
                            <li>Technical SEO (92%)</li>
                            <li>Off-Page SEO (90%)</li>
                            <li>Keyword Research (93%)</li>
                            <li>Local SEO (88%)</li>
                            <li>SEO Analytics (94%)</li>
                            <li>Content Optimization (91%)</li>
                            <li>Link Building (89%)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>IT & Cybersecurity</h4>
                        <ul class="skill-list">
                            <li>IT Management (90%)</li>
                            <li>System Troubleshooting (92%)</li>
                            <li>Bug Fixing & Debugging (90%)</li>
                            <li>Cybersecurity Basics (85%)</li>
                            <li>AI Chatbot Development (88%)</li>
                            <li>Automation Systems (87%)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>Accounting & Business</h4>
                        <ul class="skill-list">
                            <li>ACCA (7 exams completed)</li>
                            <li>Bookkeeping (90%)</li>
                            <li>Financial Accounting (88%)</li>
                            <li>Management Accounting (85%)</li>
                            <li>Payroll Systems (87%)</li>
                            <li>Advanced Excel (92%)</li>
                            <li>Budget Preparation (86%)</li>
                        </ul>
                    </div>
                    <div class="skill-category">
                        <h4>Game Development</h4>
                        <ul class="skill-list">
                            <li>Unity 2D/3D Development (85%)</li>
                            <li>Unreal Engine (80%)</li>
                            <li>Browser-based Games (88%)</li>
                            <li>C# Programming (85%)</li>
                            <li>React Game Logic (88%)</li>
                            <li>TypeScript (90%)</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Professional Experience</h2>
                
                <div class="experience-item">
                    <h4>IT Manager</h4>
                    <p class="organization">The Skyline Strategies</p>
                    <p class="period">Duration: 1 Year</p>
                    <p><strong>Key Responsibilities:</strong></p>
                    <ul class="skill-list">
                        <li>Managed full IT operations including websites, hosting, and security systems</li>
                        <li>Led development of modern digital tools and AI-powered solutions</li>
                        <li>Handled client projects and resolved technical issues efficiently</li>
                        <li>Oversaw team coordination and project management</li>
                    </ul>
                    <p><strong>Technologies:</strong> IT Management, Security, AI Systems, Client Management</p>
                </div>
                
                <div class="experience-item">
                    <h4>Website Developer</h4>
                    <p class="organization">Computer Support Centre</p>
                    <p class="period">Duration: 2 Years</p>
                    <p><strong>Key Responsibilities:</strong></p>
                    <ul class="skill-list">
                        <li>Developed custom WordPress/React websites and e-commerce solutions</li>
                        <li>Resolved bugs, speed optimization issues, and server errors</li>
                        <li>Managed client website updates, maintenance, and support</li>
                        <li>Implemented responsive designs and modern UI/UX</li>
                    </ul>
                    <p><strong>Technologies:</strong> WordPress, React, WooCommerce, Bug Fixing, Performance Optimization</p>
                </div>
                
                <div class="experience-item">
                    <h4>Website Manager</h4>
                    <p class="organization">chishtyukimmigrationlaw.info</p>
                    <p class="period">Duration: 1 Year</p>
                    <p><strong>Key Responsibilities:</strong></p>
                    <ul class="skill-list">
                        <li>Managed complete website design, updates, and technical fixes</li>
                        <li>Implemented comprehensive SEO strategies for immigration law services</li>
                        <li>Ensured website security and performance optimization</li>
                    </ul>
                    <p><strong>Technologies:</strong> Web Management, SEO, Technical Fixes</p>
                </div>
                
                <div class="experience-item">
                    <h4>Website Manager</h4>
                    <p class="organization">lawbookscentre.com</p>
                    <p class="period">Duration: 1 Year</p>
                    <p><strong>Key Responsibilities:</strong></p>
                    <ul class="skill-list">
                        <li>Improved UI/UX design for enhanced user experience</li>
                        <li>Implemented SEO best practices and performance optimization</li>
                        <li>Managed e-commerce platform for law book sales</li>
                    </ul>
                    <p><strong>Technologies:</strong> UI/UX, SEO, E-commerce Management</p>
                </div>
                
                <div class="experience-item">
                    <h4>Online Books Sales Manager</h4>
                    <p class="organization">Al Noor Law Book House</p>
                    <p class="period">Duration: 5 Years</p>
                    <p><strong>Key Responsibilities:</strong></p>
                    <ul class="skill-list">
                        <li>Managed comprehensive online sales operations</li>
                        <li>Oversaw inventory management and stock control</li>
                        <li>Provided excellent customer support and handled queries</li>
                    </ul>
                    <p><strong>Skills:</strong> Sales Management, Inventory Control, Customer Support</p>
                </div>
                
                <div class="experience-item">
                    <h4>Online Books Sales Manager</h4>
                    <p class="organization">City Law Book House</p>
                    <p class="period">Duration: 3 Years</p>
                    <p><strong>Key Responsibilities:</strong></p>
                    <ul class="skill-list">
                        <li>Managed daily operations and sales processes</li>
                        <li>Created and managed digital product listings</li>
                        <li>Coordinated with suppliers and customers</li>
                    </ul>
                    <p><strong>Skills:</strong> Operations Management, Sales, Digital Listings</p>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Education & Certifications</h2>
                
                <div class="education-item">
                    <h4>ACCA (Pursuing - Skilled Module)</h4>
                    <p class="organization">Association of Chartered Certified Accountants</p>
                    <p class="period">Status: Ongoing | 7 out of 13 exams completed</p>
                    
                    <p style="margin-top: 15px;"><strong>Completed Exams (Foundation Level):</strong></p>
                    <ul class="skill-list">
                        <li>FA1 - Recording Financial Transactions</li>
                        <li>MA1 - Management Information</li>
                        <li>FA2 - Maintaining Financial Records</li>
                        <li>MA2 - Managing Costs and Finance</li>
                        <li>FMA - Management Accounting</li>
                        <li>FFA - Financial Accounting</li>
                        <li>FBT - Foundations in Business & Technology</li>
                    </ul>
                    
                    <p style="margin-top: 15px;"><strong>Remaining Exams:</strong></p>
                    <ul class="skill-list">
                        <li><strong>Skilled Level:</strong> LW (Corporate Law), TX (Taxation), FR (Financial Reporting), PM (Performance Management), AA (Audit & Assurance), FM (Financial Management)</li>
                        <li><strong>Professional Level:</strong> APM (Advanced Performance Management), ATX (Advanced Taxation), AFM (Advanced Financial Management), AAA (Advanced Audit & Assurance)</li>
                        <li><strong>Strategic Professional:</strong> SBL (Strategic Business Leader), SBR (Strategic Business Reporting)</li>
                    </ul>
                    
                    <p style="margin-top: 10px;">Currently pursuing Skilled Module with focus on advanced financial and management accounting, corporate law, and taxation.</p>
                </div>
                
                <div class="education-item">
                    <h4>IGCSE</h4>
                    <p class="organization">Cambridge International</p>
                    <p class="period">Status: Completed</p>
                    <p>Successfully completed International General Certificate of Secondary Education (IGCSE) with strong foundation in core subjects including Mathematics, English, Sciences, and Business Studies.</p>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Recent Websites & Projects</h2>
                <p style="margin-bottom: 20px; color: #ffffff;">A selection of 20+ professional websites and web applications built for various clients across different industries.</p>
                
                <div class="skills-grid" style="grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px;">
                    <div class="skill-category">
                        <h4>E-Commerce Websites</h4>
                        <ul class="skill-list" style="margin-top: 10px;">
                            <li>bncclothing.co.uk - Fashion Store</li>
                            <li>clogsy.co.uk - Footwear Shop</li>
                            <li>leatherledgers.co.uk - Leather Products</li>
                            <li>lawbookscentre.com - Legal Books Store</li>
                            <li>novelsyard.com - Books Marketplace</li>
                            <li>comfortfurnishings.co.uk - Furniture Store</li>
                        </ul>
                    </div>
                    
                    <div class="skill-category">
                        <h4>React & Modern Web Apps</h4>
                        <ul class="skill-list" style="margin-top: 10px;">
                            <li>esteaesthetic.com - Aesthetic Services</li>
                            <li>services.esteaesthetic.com - Booking Platform</li>
                            <li>acecleaning.services - Cleaning Services</li>
                            <li>mujtabaahmed.vercel.app - Portfolio</li>
                            <li>saeedkhan.vercel.app - Portfolio</li>
                            <li>the-skyline-strategies.vercel.app - Next.js Site</li>
                        </ul>
                    </div>
                    
                    <div class="skill-category">
                        <h4>Professional Services</h4>
                        <ul class="skill-list" style="margin-top: 10px;">
                            <li>chishtyukimmigrationlaw.info - Immigration Law</li>
                            <li>Multiple Law Firm Websites</li>
                            <li>Business Consulting Platforms</li>
                            <li>Corporate Portfolio Sites</li>
                            <li>Service Provider Websites</li>
                        </ul>
                    </div>
                    
                    <div class="skill-category">
                        <h4>AI Chatbots & Games</h4>
                        <ul class="skill-list" style="margin-top: 10px;">
                            <li>Software Developer AI Assistant</li>
                            <li>Graphic Designer Chatbot</li>
                            <li>Medical Clinic Chatbot</li>
                            <li>Cleaning Services Bot</li>
                            <li>Interactive Typing Game</li>
                            <li>ACCA Quiz Application</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="section">
                <h2 class="section-title">Portfolio Statistics</h2>
                <div class="skills-grid" style="grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                    <div class="skill-category">
                        <h4>SaaS Products</h4>
                        <p style="font-size: 2.5em; color: #06b6d4; font-weight: bold; margin: 10px 0;">2</p>
                        <p>Production SaaS products (CompanyHub, ExpenseFlow)</p>
                    </div>
                    <div class="skill-category">
                        <h4>Blog Articles</h4>
                        <p style="font-size: 2.5em; color: #06b6d4; font-weight: bold; margin: 10px 0;">20+</p>
                        <p>SEO-optimized technical articles published</p>
                    </div>
                    <div class="skill-category">
                        <h4>Websites Built</h4>
                        <p style="font-size: 2.5em; color: #06b6d4; font-weight: bold; margin: 10px 0;">20+</p>
                        <p>E-commerce stores, portfolios, and business websites</p>
                    </div>
                    <div class="skill-category">
                        <h4>Marketing Campaigns</h4>
                        <p style="font-size: 2.5em; color: #06b6d4; font-weight: bold; margin: 10px 0;">100+</p>
                        <p>Successful digital marketing campaigns delivered</p>
                    </div>
                    <div class="skill-category">
                        <h4>AI Chatbots</h4>
                        <p style="font-size: 2.5em; color: #06b6d4; font-weight: bold; margin: 10px 0;">10+</p>
                        <p>Custom AI chatbots and automation systems</p>
                    </div>
                    <div class="skill-category">
                        <h4>Years Experience</h4>
                        <p style="font-size: 2.5em; color: #06b6d4; font-weight: bold; margin: 10px 0;">6+</p>
                        <p>Years of professional experience</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>MUHAMMAD ANEES</strong> - Multi-Disciplinary Professional</p>
            <p style="margin-top: 10px;">© 2025 | Available for Freelance & Consulting Projects</p>
            <p style="margin-top: 8px; font-size: 0.9em;">
                <a href="http://github.com/anees0005" target="_blank" style="color: #06b6d4; text-decoration: none; margin: 0 10px;">GitHub</a> | 
                <a href="https://www.linkedin.com/in/muhammad-anees-37932a356" target="_blank" style="color: #06b6d4; text-decoration: none; margin: 0 10px;">LinkedIn</a>
            </p>
        </div>
    </div>
    
    <script>
        (function() {
            function initAnimation(canvasId) {
                const canvas = document.getElementById(canvasId);
                if (!canvas || typeof THREE === 'undefined') return;
                
                const scene = new THREE.Scene();
                const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
                const renderer = new THREE.WebGLRenderer({ 
                    canvas: canvas, 
                    alpha: true, 
                    antialias: true 
                });
                
                // Set solid background color
                renderer.setClearColor(0x0f172a, 1);
                
                // Ensure full side coverage
                const setSize = () => {
                    // Get actual canvas dimensions
                    const rect = canvas.getBoundingClientRect();
                    const width = rect.width || canvas.clientWidth || window.innerWidth * 0.25;
                    const height = Math.max(
                        rect.height || canvas.clientHeight || window.innerHeight,
                        window.innerHeight,
                        document.documentElement.clientHeight,
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight
                    );
                    renderer.setSize(width, height);
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                };
                
                setSize();
                renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
                
                // Update size after page load
                setTimeout(setSize, 100);
                setTimeout(setSize, 500);
                
                camera.position.z = 5;
                
                // Create floating particles with network connections
                const particlesCount = 100;
                const particlesGeometry = new THREE.BufferGeometry();
                const posArray = new Float32Array(particlesCount * 3);
                const velArray = new Float32Array(particlesCount * 3);
                
                for (let i = 0; i < particlesCount * 3; i += 3) {
                    posArray[i] = (Math.random() - 0.5) * 18;
                    posArray[i + 1] = (Math.random() - 0.5) * 18;
                    posArray[i + 2] = (Math.random() - 0.5) * 18;
                    
                    velArray[i] = (Math.random() - 0.5) * 0.02;
                    velArray[i + 1] = (Math.random() - 0.5) * 0.02;
                    velArray[i + 2] = (Math.random() - 0.5) * 0.02;
                }
                
                particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
                
                const particlesMaterial = new THREE.PointsMaterial({
                    size: 0.08,
                    color: 0xffffff,
                    transparent: true,
                    opacity: 0.9,
                    blending: THREE.AdditiveBlending,
                    sizeAttenuation: true
                });
                
                const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
                scene.add(particlesMesh);
                
                // Create connecting lines
                const lineGeometry = new THREE.BufferGeometry();
                const lineMaterial = new THREE.LineBasicMaterial({
                    color: 0xd1d5db,
                    transparent: true,
                    opacity: 0.4
                });
                
                const maxDistance = 3.5;
                let connections = [];
                
                for (let i = 0; i < particlesCount; i++) {
                    for (let j = i + 1; j < particlesCount; j++) {
                        const i3 = i * 3;
                        const j3 = j * 3;
                        const dx = posArray[i3] - posArray[j3];
                        const dy = posArray[i3 + 1] - posArray[j3 + 1];
                        const dz = posArray[i3 + 2] - posArray[j3 + 2];
                        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                        
                        if (distance < maxDistance) {
                            connections.push(
                                posArray[i3], posArray[i3 + 1], posArray[i3 + 2],
                                posArray[j3], posArray[j3 + 1], posArray[j3 + 2]
                            );
                        }
                    }
                }
                
                if (connections.length > 0) {
                    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3));
                    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
                    scene.add(lineMesh);
                }
                
                // Smooth flowing animation
                const clock = new THREE.Clock();
                function animate() {
                    requestAnimationFrame(animate);
                    
                    const elapsedTime = clock.getElapsedTime();
                    const positions = particlesGeometry.attributes.position.array;
                    
                    // Update particle positions
                    for (let i = 0; i < particlesCount * 3; i += 3) {
                        positions[i] += velArray[i] + Math.sin(elapsedTime * 0.5 + i * 0.01) * 0.002;
                        positions[i + 1] += velArray[i + 1] + Math.cos(elapsedTime * 0.5 + i * 0.01) * 0.002;
                        positions[i + 2] += velArray[i + 2] + Math.sin(elapsedTime * 0.3 + i * 0.02) * 0.001;
                        
                        if (Math.abs(positions[i]) > 12) velArray[i] *= -1;
                        if (Math.abs(positions[i + 1]) > 12) velArray[i + 1] *= -1;
                        if (Math.abs(positions[i + 2]) > 12) velArray[i + 2] *= -1;
                    }
                    
                    particlesGeometry.attributes.position.needsUpdate = true;
                    particlesMesh.rotation.y += 0.0005;
                    particlesMesh.rotation.x += 0.0003;
                    
                    // Update connections
                    if (lineGeometry.attributes.position) {
                        const newConnections = [];
                        for (let i = 0; i < particlesCount; i++) {
                            for (let j = i + 1; j < particlesCount; j++) {
                                const i3 = i * 3;
                                const j3 = j * 3;
                                const dx = positions[i3] - positions[j3];
                                const dy = positions[i3 + 1] - positions[j3 + 1];
                                const dz = positions[i3 + 2] - positions[j3 + 2];
                                const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
                                
                                if (distance < maxDistance) {
                                    newConnections.push(
                                        positions[i3], positions[i3 + 1], positions[i3 + 2],
                                        positions[j3], positions[j3 + 1], positions[j3 + 2]
                                    );
                                }
                            }
                        }
                        
                        if (newConnections.length > 0) {
                            lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(newConnections, 3));
                            lineGeometry.attributes.position.needsUpdate = true;
                        }
                    }
                    
                    renderer.render(scene, camera);
                }
                
                animate();
                
                // Handle resize
                function handleResize() {
                    const rect = canvas.getBoundingClientRect();
                    const width = rect.width || canvas.clientWidth || window.innerWidth * 0.25;
                    const height = Math.max(
                        rect.height || canvas.clientHeight || window.innerHeight,
                        window.innerHeight,
                        document.documentElement.clientHeight,
                        document.body.scrollHeight,
                        document.documentElement.scrollHeight
                    );
                    camera.aspect = width / height;
                    camera.updateProjectionMatrix();
                    renderer.setSize(width, height);
                }
                
                window.addEventListener('resize', handleResize);
                window.addEventListener('scroll', handleResize);
                // Update on content load
                if (document.readyState === 'complete') {
                    setTimeout(handleResize, 100);
                } else {
                    window.addEventListener('load', () => setTimeout(handleResize, 100));
                }
            }
            
            // Initialize both side animations
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function() {
                    initAnimation('animation-left');
                    initAnimation('animation-right');
                });
            } else {
                initAnimation('animation-left');
                initAnimation('animation-right');
            }
        })();
    </script>
</body>
</html>
`;

    const blob = new Blob([resumeHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Muhammad_Anees_Animated_CV.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0f172a] overflow-y-auto">
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1, backgroundColor: '#0f172a' }}
      />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-3 sm:p-4 md:p-6 py-8 sm:py-12">
        <div className="max-w-2xl w-full bg-gray-900/90 backdrop-blur-md border-2 border-cyan-500/40 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center my-auto shadow-2xl">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all z-20"
            aria-label="Close"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 mb-2 sm:mb-3 md:mb-4">Download My CV</h2>
          <p className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 md:mb-8 px-2">
            Get my beautifully designed, dark-themed animated CV with all my experience, skills, and qualifications.
          </p>
          
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <button
              onClick={handleDownload}
              className="w-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-cyan-500 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-cyan-600 transition-all hover:scale-105 shadow-lg text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              📥 Download CV
            </button>
            
            <button
              onClick={onClose}
              className="w-full px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 bg-gray-700 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-gray-600 transition-all text-xs sm:text-sm md:text-base whitespace-nowrap"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

