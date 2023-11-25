# Harmonic Hunch - A Hackathon-Inspired WebApp

Harmonic Hunch is a web application, crafted during a spirited hackathon at my internship, drawing inspiration from the engaging dynamics of Kahoot. Developed collaboratively with a dynamic team, this project showcases the fusion of React with Next.js for the front end and Express with Node.js for the server side. Leveraging WebSockets, we ensured seamless communication between the client and server.

## Game Modes

### 1. Melodic Layers

In Melodic Layers, we've transformed the classic "guess the song" game into an immersive experience. Harnessing the power of demucs, an AI model capable of separating music tracks, every 8 seconds unveils a new layer to the song. Starting with the bass, each subsequent layer introduces elements like guitar, percussion, and finally, the vocals. Test your musical intuition as the composition gradually unfolds!

### 2. Illustrated Beats

Dive into the creative realm of Illustrated Beats, our second game mode. By employing DALL-E 3, an AI model, we generate captivating images based on song lyrics, title, and overall vibe. Explore the synergy between music and visual artistry as the algorithm conjures unique illustrations tied to the essence of the song.

## AI Integration

Harmonic Hunch integrates cutting-edge AI models to enhance the gaming experience:

### 1. Demucs

(https://github.com/facebookresearch/demucs) - We implemented the demucs model to deconstruct music into individual tracks, providing players with a unique and evolving listening challenge in Melodic Layers.

### 2. DALL-E 3

 Our use of DALL-E 3 in Illustrated Beats allows for the generation of artistic visuals inspired by song lyrics, title, and mood. Witness the fusion of music and visual creativity like never before.

 ## Getting Started Locally

To experience Harmonic Hunch locally, follow these steps:

1. In the project's root directory, navigate to the client folder and run:

    ```bash
    npm i
    npm start
    ```

2. Next, navigate to the server folder and run:

    ```bash
    npm i
    npm run server
    ```

3. Open your browser and go to [http://localhost:3000](http://localhost:3000) to access Harmonic Hunch.

Please note that these instructions assume you have Node.js and npm installed on your machine.

## Hackathon Version

Please note that this is the hackathon version of Harmonic Hunch, created within the constraints of a limited timeframe. While it offers a glimpse into the possibilities, there's ample room for improvement and expansion. Feel free to contribute and enhance the project in various ways—we didn't have all the time in the world, but the potential is boundless.

**Explore the harmony of code and creativity with Harmonic Hunch!**
