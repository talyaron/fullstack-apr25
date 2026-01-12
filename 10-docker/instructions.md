# Docker Instructions for React Example App

## Prerequisites

- **Docker Desktop** installed ([Download here](https://www.docker.com/products/docker-desktop/))
- Docker must be running before executing the commands below

---

## Commands to Run

### 1. Clone the repository

```bash
git clone <your-repo-url>
```
**Explanation:** Downloads the project code from the remote Git repository to your local machine.

---

### 2. Navigate to the project folder

```bash
cd 10-docker/example/example
```
**Explanation:** Changes directory to where the Dockerfile is located. The Dockerfile contains the instructions for building the Docker image.

---

### 3. Build the Docker image

```bash
docker build -t react-example-app .
```
**Explanation:**
- `docker build` - Creates a Docker image from the Dockerfile
- `-t react-example-app` - Tags (names) the image as "react-example-app"
- `.` - Tells Docker to look for the Dockerfile in the current directory

This process installs dependencies, builds the React app, and packages it with nginx.

---

### 4. Run the container

```bash
docker run -d -p 3000:80 --name react-app react-example-app
```
**Explanation:**
- `docker run` - Creates and starts a new container from an image
- `-d` - Runs the container in detached mode (background)
- `-p 3000:80` - Maps port 3000 on your machine to port 80 inside the container
- `--name react-app` - Names the container "react-app" for easy reference
- `react-example-app` - The image to use (the one we built in step 3)

---

### 5. Open in browser

Visit: **http://localhost:3000**

**Explanation:** The React app is now being served by nginx inside the container. Port 3000 on your machine forwards traffic to the container.

---

## Stopping and Cleaning Up

### Stop the container

```bash
docker stop react-app
```
**Explanation:** Gracefully stops the running container. The container still exists and can be restarted.

---

### Start the container again

```bash
docker start react-app
```
**Explanation:** Restarts a stopped container without needing to rebuild.

---

### Remove the container

```bash
docker rm react-app
```
**Explanation:** Deletes the container. You must stop it first, or use `docker rm -f react-app` to force remove.

---

### Remove the image (optional)

```bash
docker rmi react-example-app
```
**Explanation:** Deletes the Docker image from your machine. Only do this if you want to free up disk space and don't need the image anymore.

---

## Summary

That's it - no need to install Node.js or run `npm install`. Docker handles everything inside the container.
