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

## Troubleshooting

### Error: "500 Internal Server Error for API route"

```
ERROR: request returned 500 Internal Server Error for API route and version
http://%2F%2F.%2Fpipe%2FdockerDesktopLinuxEngine/_ping
```

**Cause:** Docker Desktop is not running.

**Solution:**
1. **Windows:** Open Docker Desktop from the Start menu
2. **Mac:** Open Docker Desktop from Applications
3. Wait for it to fully start (whale icon stops animating)
4. Verify with: `docker ps`

| Problem | Solution |
|---------|----------|
| Docker Desktop not installed | [Download and install](https://www.docker.com/products/docker-desktop/) |
| Docker Desktop closed | Open it and wait for startup |
| Docker service stopped (Windows) | Run `Start-Service docker` in PowerShell as Admin |
| Need to restart Docker | Right-click Docker icon → Restart |

---

### Error: "tsc: not found"

```
sh: tsc: not found
ERROR: failed to solve: process "/bin/sh -c npm run build" did not complete successfully
```

**Cause:** The Dockerfile used `npm ci --only=production` which skips devDependencies like TypeScript.

**Solution:** Make sure line 27 in the Dockerfile says:
```dockerfile
RUN npm ci
```

NOT:
```dockerfile
RUN npm ci --only=production
```

Then rebuild:
```bash
docker build -t react-example-app .
```

---

### Error: "container name already in use"

```
docker: Error response from daemon: Conflict. The container name "/react-app" is already in use
```

**Solution:** Remove the existing container first:
```bash
docker rm -f react-app
```

Then run again:
```bash
docker run -d -p 3000:80 --name react-app react-example-app
```

---

### Error: "port is already allocated"

```
docker: Error response from daemon: Bind for 0.0.0.0:3000 failed: port is already allocated
```

**Solution:** Either stop what's using port 3000, or use a different port:
```bash
docker run -d -p 3001:80 --name react-app react-example-app
```

Then visit: http://localhost:3001

---

## Summary

That's it - no need to install Node.js or run `npm install`. Docker handles everything inside the container.
