const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


// Define node properties
const nodeSize = 20;
const nodeColor = "rgba(0, 0, 255, 0.5)"; // Set the alpha value to 0.5 for transparency

// Define an array to store nodes
let nodes = [
  { x: 100, y: 100 },
  { x: 200, y: 200 },
  { x: 300, y: 300 }
];


  


    // Initialize variables to keep track of mouse state
    let isMouseDown = false;
    let mouseX = 0;
    let mouseY = 0;

    // Initialize variables for line drawing
    let isLineDrawingEnabled = false;
    let startNode = null;
    let endNode = null;


    const updateButtonStyle = () => {
        if (isLineDrawingEnabled) {
          toggleButton.style.backgroundColor = "#444";
          toggleButton.style.color = "white";
        } else {
          toggleButton.style.backgroundColor = "lightgray";
          toggleButton.style.color = "black";
        }
      };
      
      // Call the function initially to set the button style
      updateButtonStyle();



    
    // Add event listener for mouse down event
    document.addEventListener("mousedown", (event) => {
        isMouseDown = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
  
        // Check if line drawing is enabled
        if (isLineDrawingEnabled) {
          // Check if clicked on a node
          const clickedNode = nodes.find(node => {
            const dx = mouseX - node.x;
            const dy = mouseY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= nodeSize;
          });
  
          if (clickedNode) {
            if (!startNode) {
              // Set the clicked node as the start node
              startNode = clickedNode;
            } else {
              // Set the clicked node as the end node and draw a line between them
              endNode = clickedNode;
        
              ctx.strokeStyle = "#000";
              ctx.beginPath();
              ctx.moveTo(startNode.x, startNode.y);
              ctx.lineTo(endNode.x, endNode.y);
              ctx.closePath();
              ctx.stroke();



              /*
              // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);

             // Draw lines from nodes to mouse coordinates
            for (const node of nodes) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(mouseX, mouseY);
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            // Draw nodes
            for (const node of nodes) {
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
                ctx.fillStyle = "#00f";
                ctx.fill();
                ctx.stroke();
            }
            */
  
              // Reset start and end nodes for the next line drawing
              startNode = null;
              endNode = null;
            }
          }




        }
      });

    // Add event listener for mouse up event
    document.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

/*
    // Function to redraw canvas
const redrawCanvas = () => {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // Draw lines from nodes to mouse coordinates
    if (isLineDrawingEnabled) {
      for (const node of nodes) {
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  
    // Draw nodes
    for (const node of nodes) {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = "#00f";
      ctx.fill();
      ctx.stroke();
    }
  
    // Call the function on the next frame update
    requestAnimationFrame(redrawCanvas);
  };
  
  // Call the function to start redrawing the canvas
  redrawCanvas();

  */


    // Add event listener for mouse move event
    document.addEventListener("mousemove", (event) => {
      if (isMouseDown) {
        const dx = event.clientX - mouseX;
        const dy = event.clientY - mouseY;

        // Update the positions of all the nodes based on the mouse movement
        nodes.forEach(node => {
          node.x += dx;
          node.y += dy;
        });

        mouseX = event.clientX;
        mouseY = event.clientY;

        // Clear canvas and redraw the nodes in their updated positions
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nodes.forEach(node => {
          ctx.fillStyle = nodeColor;
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
        });

            // Redraw lines
        if (startNode && endNode) {
            ctx.strokeStyle = "#000";
            ctx.beginPath();
            ctx.moveTo(startNode.x, startNode.y);
            ctx.lineTo(endNode.x, endNode.y);
            ctx.closePath();
            ctx.stroke();
        }
      }
    });


    // Add event listener for window resize event
    window.addEventListener("resize", () => {
      // Resize the canvas to match the window size
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Initial resize of the canvas to match the window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Add event listener for button click event
    const addButton = document.getElementById("addButton");
    addButton.addEventListener("click", () => {
      // Add a new node to the array with random x and y coordinates
      const newNode = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      };
      nodes.push(newNode);

      // Draw the new node on the canvas
      ctx.fillStyle = nodeColor;
      ctx.beginPath();
      ctx.arc(newNode.x, newNode.y, nodeSize, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    });

    // Add event listener for click event on "Toggle Line Drawing" button
document.getElementById("toggleButton").addEventListener("click", () => {
    isLineDrawingEnabled = !isLineDrawingEnabled;
    updateButtonStyle();
  });
  



class Node {
    constructor(title, description, nodeID) {
        this.title = title;
        this.description = description;
        this.nodeID = nodeID;
    }
}

const nodeList = [
            new Node("Computer Science", "The study of computers, computing technologies, and their applications, including topics such as algorithms, data structures, programming languages, and computer architecture.", 1000),
            new Node("Physics", "The natural science that studies matter, energy, and their interactions in the physical world, including topics such as mechanics, thermodynamics, electromagnetism, and quantum mechanics.", 2000),
            new Node("Chemistry", "The scientific study of matter, its properties, composition, and changes, including topics such as chemical reactions, elements, compounds, and chemical bonding.", 3000),
            new Node("Biology", "The scientific study of living organisms and their interactions with the environment, including topics such as cellular biology, genetics, evolution, and ecology.", 4000),
            new Node("Geology", "The study of the Earth's physical structure, composition, history, and processes, including topics such as rocks, minerals, fossils, and geological formations.", 5000),
            new Node("Environmental Science", "The interdisciplinary study of the environment and its interactions with human societies, including topics such as ecology, conservation, pollution, and sustainable resource management.", 6000),
            new Node("Psychology", "The scientific study of human behavior, mental processes, and emotions, including topics such as cognition, perception, personality, and abnormal psychology.", 7000),
            new Node("Sociology", "The scientific study of human society, social interactions, and social structures, including topics such as culture, social inequality, social institutions, and social change.", 8000),
            new Node("Mathematics", "The abstract study of numbers, quantities, shapes, and patterns, including topics such as algebra, geometry, calculus, and statistics.", 9000)
];
console.log(nodeList);


const chemistrySubtopics =      new Map([
    [3000, [
                new Node("Organic Chemistry", "The study of compounds containing carbon and their reactions, including topics such as organic synthesis, organic reactions, and organic spectroscopy.", 3001),
                new Node("Inorganic Chemistry", "The study of compounds not containing carbon and their reactions, including topics such as coordination chemistry, bioinorganic chemistry, and inorganic materials.", 3002),
                new Node("Physical Chemistry", "The study of the fundamental principles of chemistry using the tools of physics, including topics such as thermodynamics, kinetics, and quantum chemistry.", 3003),
                new Node("Analytical Chemistry", "The study of methods for identifying and quantifying chemical compounds, including topics such as chromatography, spectroscopy, and electrochemistry.", 3004),
                new Node("Biochemistry", "The study of the chemical processes and substances that occur within living organisms, including topics such as metabolism, enzymes, and biochemical signaling.", 3005),
                new Node("Environmental Chemistry", "The study of the chemical processes in the environment, including topics such as atmospheric chemistry, water chemistry, and soil chemistry.", 3006),
                new Node("Polymer Chemistry", "The study of large molecules made up of repeating units, including topics such as polymerization, polymer properties, and polymer applications.", 3007),
                new Node("Medicinal Chemistry", "The study of the design, synthesis, and characterization of compounds with therapeutic properties, including topics such as drug discovery, drug delivery, and pharmacokinetics.", 3008),
                new Node("Computational Chemistry", "The use of computer simulations and modeling to study chemical systems, including topics such as quantum chemistry calculations, molecular dynamics simulations, and molecular modeling.", 3009)
    ]]
]);

console.log(chemistrySubtopics.get(3000));

const SubjectMap =      new Map(
    [
        [1000,
            [
                new Node('Artificial Intelligence', 'The study of developing intelligent machines and systems that can perform tasks that typically require human intelligence, such as natural language processing, machine learning, and computer vision.', 1001),
                new Node('Data Science', 'The interdisciplinary field that involves methods and techniques for extracting insights, knowledge, and meaningful information from large and complex data sets, including data visualization, statistical analysis, and machine learning.', 1002),
                new Node('Computer Vision', 'The area of computer science that focuses on enabling computers to interpret, understand, and process visual information from the world, such as image and video processing, object detection, and facial recognition.', 1003),
                new Node('Human-Computer Interaction', 'The field that studies how humans interact with computers and how to design and develop user-friendly interfaces and interactive systems for improving the user experience and usability of computer-based technologies.', 1004),
                new Node('Computer Networks', 'The study of designing, building, and managing networks that enable communication and data exchange among computers and other devices, including topics such as network protocols, routing, and security.', 1005),
                new Node('Software Engineering', 'The discipline that involves designing, building, and maintaining software systems, including software development methodologies, programming paradigms, and software testing and quality assurance techniques.', 1006),
                new Node('Database Systems', 'The study of designing, building, and managing databases that store and organize large volumes of data, including relational databases, NoSQL databases, and data modeling techniques.', 1007),
                new Node('Computer Architecture', 'The field that focuses on the design and organization of computer systems, including the design of processors, memory systems, and input/output devices, as well as computer system performance evaluation and optimization.', 1008),
                new Node('Operating Systems', 'The study of designing, building, and managing software that manages computer hardware and provides a platform for running other software applications, including topics such as process management, file systems, and virtualization.', 1009),
                new Node('Computer Security', 'The area of computer science that deals with protecting computer systems and networks from unauthorized access, data breaches, and cyber attacks, including topics such as cryptography, network security, and software security.', 10010),
                new Node('Computer Graphics', 'The field that involves creating, processing, and rendering visual content on computer screens or other digital displays, including topics such as 3D graphics, rendering techniques, and computer animation.', 1011),
                new Node('Web Development', 'The study of designing, building, and managing websites and web applications, including topics such as front-end and back-end development, web design principles, and web technologies such as HTML, CSS, and JavaScript.', 1012)
            ]
        ], 
        [2000,
            [
                new Node("Mechanics", "The study of motion, forces, and energy, including topics such as classical mechanics, quantum mechanics, and celestial mechanics.", 2001),
                new Node("Electromagnetism", "The study of electric and magnetic fields and their interactions, including topics such as electromagnetism, electromagnetic waves, and electromagnetic theory.", 2001),
                new Node("Thermodynamics", "The study of heat, energy transfer, and the behavior of macroscopic systems, including topics such as thermodynamic laws, heat engines, and thermal properties of materials.", 2001),
                new Node("Optics", "The study of light and its behavior, including topics such as geometric optics, wave optics, and quantum optics.", 2001),
                new Node("Quantum Physics", "The study of the behavior of matter and energy at the atomic and subatomic scale, including topics such as quantum mechanics, quantum field theory, and quantum computing.", 2001),
                new Node("Particle Physics", "The study of fundamental particles and their interactions, including topics such as particle accelerators, particle detectors, and the Standard Model of particle physics.", 2001),
                new Node("Astrophysics", "The study of the properties and behavior of celestial objects and the universe, including topics such as cosmology, stellar evolution, and black holes.", 2001),
                new Node("Condensed Matter Physics", "The study of the properties and behavior of matter in its condensed form, including topics such as solid state physics, materials science, and nanoscience.", 2001),
                new Node("Nuclear Physics", "The study of the properties and behavior of atomic nuclei and their interactions, including topics such as nuclear decay, nuclear reactions, and nuclear power.", 2001),
                new Node("Biophysics", "The study of the application of physics principles and techniques to biological systems, including topics such as biomolecules, biophysical techniques, and biophysical modeling.", 2001)
            ]
        ],
        [3000, 
            [
                new Node("Organic Chemistry", "The study of compounds containing carbon and their reactions, including topics such as organic synthesis, organic reactions, and organic spectroscopy.", 3001),
                new Node("Inorganic Chemistry", "The study of compounds not containing carbon and their reactions, including topics such as coordination chemistry, bioinorganic chemistry, and inorganic materials.", 3002),
                new Node("Physical Chemistry", "The study of the fundamental principles of chemistry using the tools of physics, including topics such as thermodynamics, kinetics, and quantum chemistry.", 3003),
                new Node("Analytical Chemistry", "The study of methods for identifying and quantifying chemical compounds, including topics such as chromatography, spectroscopy, and electrochemistry.", 3004),
                new Node("Biochemistry", "The study of the chemical processes and substances that occur within living organisms, including topics such as metabolism, enzymes, and biochemical signaling.", 3005),
                new Node("Environmental Chemistry", "The study of the chemical processes in the environment, including topics such as atmospheric chemistry, water chemistry, and soil chemistry.", 3006),
                new Node("Polymer Chemistry", "The study of large molecules made up of repeating units, including topics such as polymerization, polymer properties, and polymer applications.", 3007),
                new Node("Medicinal Chemistry", "The study of the design, synthesis, and characterization of compounds with therapeutic properties, including topics such as drug discovery, drug delivery, and pharmacokinetics.", 3008),
                new Node("Computational Chemistry", "The use of computer simulations and modeling to study chemical systems, including topics such as quantum chemistry calculations, molecular dynamics simulations, and molecular modeling.", 3009)
            ]
        ]
    ]
);


for (var i = 1000; i <= 3000; i += 1000) {
    for (var j = 0; j < SubjectMap.get(i).length; j++) {
        console.log(SubjectMap.get(i)[j]);
    }
}



