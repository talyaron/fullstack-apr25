interface Occasion {
  occasionName: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
  location: string;
  attendeeNumber: number;
  isPrivate: boolean;
  image: File;
}

const occasions: Occasion[] = [];
function handleSubmit(event: Event): void {
  try {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) {
      throw new Error("Event target is not a form");
    }

    const form = event.target;
    const formData = new FormData(form);

    const occasionName = formData.get("occasionName") as string;
    const date = formData.get("date") as string;
    const startTime = formData.get("startTime") as string;
    const endTime = formData.get("endTime") as string;
    const description = formData.get("description") as string;
    const location = formData.get("location") as string;
    const attendeeNumber = Number(formData.get("attendeeNumber"));
    const isPrivate = (form.elements.namedItem("checkbox") as HTMLInputElement)
      .checked;
    const image = formData.get("fileInput") as File;

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      alert("Date cannot be earlier than today.");
      return;
    }

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    if (end < start) {
      alert("End time cannot be earlier than start time.");
      return;
    }

    if (attendeeNumber < 0 || attendeeNumber > 10) {
      alert("Attendee number must be between 0 and 10.");
      return;
    }

    const occasion: Occasion = {
      occasionName,
      date,
      startTime,
      endTime,
      description,
      location,
      attendeeNumber,
      isPrivate,
      image,
    };

    if (occasion.isPrivate) {
      console.log("occasion is private");
    }

    occasions.push(occasion);
    console.log(occasions);
    renderYourItems(occasions);
  } catch (error) {
    console.error("Error submitting form:", error);
  }
}

function htmlYourItems(occasions: Occasion[]) {
  try {
    return occasions
      .map((occasion) => {
        const imgURL = occasion.image
          ? URL.createObjectURL(occasion.image)
          : "";

        return `
        <div class="occasion-card">
          <div class="occasion-card__header">
            <h3 class="occasion-card__title">${occasion.occasionName}</h3>
            <p class="occasion-card__date">${occasion.date} | ${
          occasion.startTime
        } - ${occasion.endTime}</p>
          </div>

          <div class="occasion-card__body">
            <p><strong>Description:</strong> ${occasion.description}</p>
            <p><strong>Location:</strong> ${occasion.location}</p>
            <p><strong>Attendees:</strong> ${occasion.attendeeNumber}</p>
            <p><strong>Visibility:</strong> ${
              occasion.isPrivate ? "Private" : "Public"
            }</p>
            ${
              imgURL
                ? `<img class="occasion-card__image" src="${imgURL}" alt="Occasion image" />`
                : ""
            }
          </div>
        </div>
      `;
      })
      .join("");
  } catch (error) {
    console.error("Error generating HTML:", error);
    return `<div class="error">Error rendering item</div>`;
  }
}

function renderYourItems(occasions: Occasion[]): void {
  try {
    const publicDiv = document.getElementById("publicOccasionDiv");
    const privateDiv = document.getElementById("privateOccasions");

    if (!publicDiv || !privateDiv) {
      throw new Error("One or both root elements not found");
    }
    let publicHTML = "";
    let privateHTML = "";

    for (const occasion of occasions) {
      const cardHTML = htmlYourItems([occasion]);

      if (occasion.isPrivate) {
        privateHTML += cardHTML;
      } else {
        publicHTML += cardHTML;
      }
    }
    publicDiv.innerHTML = publicHTML;
    privateDiv.innerHTML = privateHTML;
  } catch (error) {
    console.error("Error rendering items:", error);
  }
}

function showPrivateOccasions(): void {
  const checkbox = document.getElementById(
    "showPrivateToggle"
  ) as HTMLInputElement;
  const privateDiv = document.getElementById("privateOccasionDiv");

  if (!checkbox || !privateDiv) return;

  privateDiv.style.display = checkbox.checked ? "block" : "none";
}
