+ this.playerElement.className = "player" //add in line 27

- class="player" //remove in line 28

or 
+ this.playerElement.style.position = "absolute" //add in line 27

or replace to://from line 17

+ this.playerElement = domElement
        this.render()
    }
     render() {
        try {
            if (!this.playerElement) throw new Error("error");
            this.playerElement.className = "playerRoot"
            this.playerElement.innerHTML = `<img src="${this.imageUrl}" alt="${this.name}" style="width: 100px; height: 100px;">`
        } catch (error) {
            console.error("Error rendering player:", error);
        }
    }
