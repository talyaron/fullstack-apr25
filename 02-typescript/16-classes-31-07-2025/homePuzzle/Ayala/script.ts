class Player {
  name: string;
  img: string;
  position: { x: number; y: number };
  playerHTML: HTMLElement;

  constructor(name: string, img: string) {
    this.name = name;
    this.img = img;
    this.position = { x: 0, y: 0 };
    this.renderPlayer();
  }
  htmlPlayer(): string {
    return `
        <div class="player" style="background-image: url(${this.img});top:${
      7 * 30
    }px;left:${10 * 30}px"">
            <div class="player_name">${this.name}</div>
        </div>
        `;
  }
  renderPlayer() {
    try {
      const elementInHTML = document.getElementById("playerRoot");
      if (!elementInHTML)
        throw new Error("Element with id 'playerRoot' not found.");
      this.playerHTML = elementInHTML;
      this.playerHTML.innerHTML = this.htmlPlayer();
    } catch (error) {
      console.error("Error rendering ", error);
    }
  }
  move(direction: "up" | "down" | "right" | "left") {
    switch (direction) {
      case "up":
        this.position.y -= 1;
        break;
      case "down":
        this.position.y += 1;
        break;
      case "right":
        this.position.x += 1;
        break;
      case "left":
        this.position.x -= 1;
        break;
      default:
        break;
    }
    if (this.position.x > 0 || this.position.y > 0) {
    }
  }
}
class Ball {
  position: { x: number; y: number };
  ballHTML: HTMLElement;
  constructor() {
    this.position = { x: 0, y: 0 };
    this.renderBall();
  }
  htmlBall(): string {
    return `
        <div class="ball" style="top:${this.position.y * 30}px;left:${
      this.position.x * 30
    }px" ></div>`;
  }
  renderBall() {
    try {
      const elementInHTML = document.getElementById("ballRoot");
      if (!elementInHTML)
        throw new Error("Element with id 'ballRoot' not found.");
      this.ballHTML = elementInHTML;
      this.position = randomPosition();
      this.ballHTML.innerHTML = this.htmlBall();
    } catch (error) {
      console.error("Error rendering ", error);
    }
  }
}

const ball = new Ball();
const player = new Player(
  "Messi",
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhISEhIVFQ8VFRUVEBAPFQ8QEBUQFREWFhUVFRUYHSggGBolGxUVIjEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQFysdHR0tKy0rMC0tLS0rKy0rKy0tLS0tLSstLSsrKy0tLS0tLS0tLS0tLSstKy0tLS0tLSstLf/AABEIALcBEwMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAADBAIFAAEGBwj/xABBEAACAgECBAQDBQUGBQQDAAABAgADEQQhBRIxQQYTIlFhcYEHFDKRoSNCscHRM1JigqLwFVOS4fFyc7TSNENj/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIhEBAQACAgMAAQUAAAAAAAAAAAECEQMhEjFBUQQTgZHR/9oADAMBAAIRAxEAPwDx8iZiMNXIlIGATJ1tNlJipEFjpHlnSZU6cSyoaMj6HaBtaRNsBZZAw9Q0rLY5a8VcQ0coRExBJ4m1WSpMLIlYUCTrrB6nA94gHVpi3Qf+fb5yS6MnHQE5IBOCQBkneBfVvnGdhnAG3XPtI2ap2OW9XsNwM9c7d/6D2j0nZtuHncDBYfiUEZEWagg7jBg/OIPpyAfxBTjtvk/76RkaoYChC4XA5izb57fDtAbRRYULJPTjcEFcnBBB/OSUSiYK5Fq4yJowBQ1wFqx8iAtWIFVkiIQJNFYG0sOggVSM0rAhq0m2SFQTTCAIWJBZjloixWKqkQ3kGEOBIuIo0uJabkiJqUz0NasFyxm0QRgkAibCSarCBY4K0m0ILsSJEA7QoNfeJE2xLnk1eViVMEyDSIeZzQpxICZMUzCZC2+aXvAfD76lT6+StSOZiAfUf3QMjO3cnbInPMZ6t4Y0a16WjLhWdec5x33H6Y/WRyZai8MZldUjT4E0yj1l2PxbA/0gSN3hHSYOAyn3DEn/AFAy54vxjTULm63PZQoLdPgJSp4n0rkcpsx78jcv1nN5Z3uOnx451dOW8R+HBSAyOxXOMMAGBI9xjPT2nPmsjtt03+U9U4tQLakdSpRvwnf8Q2IYdQfn7zldToQcggL9Pbt/CbYZ/L7c3Jx97npQ6C3J5CPkdyQQP/H5RrlijU8lyj4jGNj126fxlqqZmzIJEmMkYcYgcxkCUi9kceKOIBGb5ZNBJhYj00lcmohkG02qQGmlaRd4by4tYsBIE5kAJNpoRNJ00RBPCM0XtaGjuSBMyCLTI0bWFsBCWtBCLadJGa5pozYj2NMdtoq5hrDBMIADMkGmcskUj2Wmw0msitcIBJtVEhMm5oxbVpF5cWK1liiv7w9yj+0JxXsBsgxsOmBkdpTtPVODrpk01OobOVppDMcbMUVTj6zPky1pfHj5UrxHw+lyVgkraFBfOCOfl6fnmV1PhrUqwrNxKYwOQVgKc5JDfiI/KXL+JqOdQq2nOcWitjWWI6Fs/wAJcanUKBzKe3brnHxnNLcY67hjaS0fCBQvqsLDY7qBn8jvKPXUZY4xjrlugHuY3frnLbkn5ntJcOPrJODtg8+64IO5HtJ8lXGa0pdVwED9oUsclgqXAiulWPTlVhmwe5/LeVdRnS69U01LheYFiCFJcr5hByVJ69ebbpgzlQ06uDLKy7cv6jHGWSe/otpzBckGbZMPN3Mi4i7LGTvMCRU5AFSFVI1VTCNXEYFdcKiSQmueAbZYpckaLQNkez0QtgQ8LqTEneOFaI1kExguaSzKRtAzJvEySZvMyT8ubFUyrYKRzGDTIGmVinKFWMwwtlUCZbNpRCESKmEED02gkysxBCESbVYwECYRJ4mYhFUPlnUcE455WmZWHMEJXl23R+mc+x5vyE50CPcGu5LB032GcEc2fTkfp9YuTHeJYZayWWh49Y5Bp0oZcn+yZ857nI9Odu4nS6XifmAJYrV7ekNy55vZuX/fwlLxC/Wk8vLTTW2CXBAY5JwcfQyb6fycM9qt3wjBjj3M5cp07JZ+VlZSA3w94pS7MxNTcjBwQeuQBgj5bkSnt4w1h5UBz/v8pccLrCYyd+p+ci43GdnM5ldRReItTYbv2jFiFHLnoASeg6DpK7zJaeLlxYrDoQR+W/8AOUJedfH3jHHy9Z0wXkg8T8yb55qyP12QytK9GjCWRBZVPCuZX12w/mxhJzF7LJl1kStsiUbW+Rstld5pm/MiOVu54nYYdjBERxOSCiFCzSpDVrHaUjQqmRtUm5CtJrXDqkmqyQEehKEK5tqYZRCOu0cgtVl1UQuTEunSVerWUmEo3QnvBU1x6quI9tqgk/KhKkjHlyaqUj5UG9cfKSD15grZVEhfJjdVEKa5TNW6qi+5ixbPKO53xIrpcLl7M+67zqOEcMLU6jUk8tVKjmPKWBLcx3I/CoCNk++B3ldfQoJyMqdwR/ETDPK43XxrjjMpv6lwXS/AAfrLlEAb4bbyn0bYOBnHxluh3z1E5s7uuvjkkA4rwd9ThKiPMzmsOQqscbrzHYE9s4GcZI6ygv8ACHEV5ebRXgseVQF5iTgnopOBsdzt8Z3ejsSsG6xglajLOxwAP6+w9zKLTcYu4tr9No6S66NbC53YP5akM9pI/AcLhfYt7nE6OC3WtOb9TJve1TrfAmuqos1FiIFqVXuqWwPelbHHOyqCuOpPq6A+xnOoZ9IawrqtSdJQMaaqxLOJ3oMB7UIevSKw/E2QrP7Lherbc74i8Nae6xzbwm6kczct+jrptVhnZiulfzMnr6kfGZ0uV4ss2WxO51XgjSEgUcRRLDkDT68HT2ls4wPMFbH6Vys4n9n/ABGpef7ubqt/XpSbun+DAf8AJcfGJW3O0uTHq4tTXgkEYYHDKdiCOoI7GOIIAKxItbXLErFNSIlUiUkSITEiwjSGZELJSarEdbVIxTXBqI1WIqcS5Jk3mZAD27QYsjF8ScwEMV2RlBmIVSz0/SOCg2rKzU15MuLxECu8ooUqqxGVEg8zmiGjNQhXcSuN8ktsQNDeECwWnySAASScAAEkk9AB3M7zw59nmouIbUBqayMgFc2EfHsny6/AdYaG3LaHSPYwStSznoqgk/P4D4zotP4X5XFVgNurIDDQ6dlyino+qv3WlPllj+7mdqPCNlYFWltFFZ/tNRjzdY3wqBArqOMjnwzb/CX3BOA1aavy6V5VJLWMxL222Hq9rnd2Puf4R6LyUvGOGlALk0621GhdNxDQUjIs0q8xVtOpxl6y9mF2LK5H4gs8u454Lurr+88Lt+96A5YVD1aioD8StWfUeU7HADDuu2Z77fclSNYxwiglj3+nuT7fGcrwXUm/VcyL5fMxtcIEB5eUKC5xuzYAJO/t0GJys6l+r48LZcvWnz7p+O+6/Vek6PQcUr8l7WYco/PPYY956T448J8Gusa23nTVN+P7iyhmbuXUgoG9yRkzjdN4X4ep9FLWMP39TabAPmECoflymYcmPG34ry35/bjQ2r4nctFCEqDlaxtXWO9tz9F2zuenQdd/ZfC3gxtFX930u19qj79xYgDlT/k6RTuW9ifSPxHJAWU+n1y0qqqwr0q7lKlWsO46cqgYxnv27bz0jw1Sy6dSyFGclyjlmYcx267jYA47ZmvFnL1Iz5uLxm7d2meG8Pq09S00ry1oNh1JJOSzMd2YkkljuScxoGZNZmznRvRXHK6qynqrgMv5GVaeGdKvO1FS6axhvbogunsznIJ5Rht+zAiWuZtNoBw3izgiXBataqm9m5NHxClQljty5FVw2UOcHAJ5GOwKkjHkes0b02NXYMMvcZ5WU9GXPY/n2OCCJ9IazTJaj1WKGrcYZT7fD2IO4PYgGeNeMNOLBYvNza7Rs6agkYaysHmWz4l6mW04AAKXn96KnHIsYhqGhbLtom5kbaaQkXM2ZEiGy0gIVZEJCIItlU1ENmDBkHeMxeeZAc81AlpqrJXvbM1eoiHm7yqUq3oaWFLyl010sK7oQ7TdrxOxxNW25idtkohS80zQCvNMZNONM28b4fpmscIgyxye5AUAszHHYAE/SKIk7r7NNErW8xGS12mpXI25fMOocfHK6bHyz7xQV6L4b+z3SUJWbUZ9R6WsLtlSwOQuBsFB/d79GLYnaFv+0GxznH1HT6iYDnr1lIb+P5yYkB8PnMsvRFLuwVFBLOxCqqjckk7ARhxHH+Nm12rwfLR2CoNyzKSOZvy6dpUrrrfLYKeVWb1cmxbAwAx7qN9um5g3fndyPwl2YnpkFif5yGqsVfVkkAbVqNsk4B2G35zgyttt29TDUxmMhLVKuMu55enIuBk+228X+8CvAKAE/wBnSoyx/Lv/AL3hjYR6mXB/dU9c/LsIDRUW23CnTLz6px+0tJPKi/vEtj0oP126nAkSbaZ5STtd+HlDaylWQW6gMG5dvLorU+piO5Gdie+Mb4nqeZTeGvD9ekrKqee5sG69h6nYdvgoycD+ZJlwD8Z3cWHjNV5vNyeeXSl4jqnezkqsGF/FkqoyMg7nr1H5RrhGpLKVds2L+IbHbpkEfiGe/wAZzd/BWchlLJdWWVkQ/jyG8suMZKAvkHoNz3yGvDuse1lZk5GRWS0hXrVmDEcwQ7rnry74xjO22WGF8v3Pz799b3/HxNy68f8AHTsZot8dv+0X1F+O8HY58s77mdDM0twOB36/TO05rxlQnNXZ5QNjq6h1C87W1r5lNRJ7Op1Fe/8AzT0llVrgdxuSSEUf3R6c/wAYh4yS19HZ5Cl76nouqRQzFrKNRXbygKCSTyHGIB4j4k4YKL2Rd6WVbaD702DK4+RDLn/BKspPQ/GfCLDpDc1ViDT6i3y/MUoBo9RqLFrQD/CUpIB6C75zhEWZZdN8OyjVyHJHnrgyky8m3hssFk+SGWqE8uXKzuJNxBcsfamYtEuM7CPlmZLddLMjLbnXBgCJe36OVllG8q1MjKDGkcwNaQ1Yi2ehCYBoyybQHJHKLEVEmBImTSFEERZ6B9m+QEOD/wDnafOBnb7vqFJ+WXXftOAE9M+ybXLXVqSTiwvWE6b8yMSOnT0HPyi3JN0rN3p6s1v97p2boPr7GDZyO4+B9/gfYzYtyAcYyAfVkDp0z/UTEo7jp7ZUrj4e0pLeku5lyOxI/p/Kc14z4pYhSlSnlWI3m5w7t+7ychBAXcnm6kjG2Dm5ooNVrD/9bjmUE/hYdQPhg/pOO+0dylmmcDZ/MrLHcBgQyD65s/6ZnyWzG6acUlzkquewhTjYe57/AEnO6/iODnmKkbqM7lvc+wkuKcQwuA+SNgM9/cyq0vCqHet9ZqhRVY4TFaWXWBioZfMIHLVzKQQSTkZOMAzkxwuTv5OWYQTT333WLVWGutc+lFJJY/4j7D3Owntfg7w/90o5Ww2of1XuOmeyKf7q/rue85Dheu0Wm03EadLptTp9RRpnsssuC0aqynlP7Su083KR1AKjfG3XFvo/FjgcNoqoa5tXpPMot1NwSzzErBPn8qEdNyy75zhZ1cfFMe3Fyc1z6+O2mmf4zjvFviy7Q0rdamnyPL59Mljvc4JUWPU2AAqk7cy77bgkCAv43q/+LtpVtpTTVaQ6hg9dj5Tz6g+SHB5wucN0GT6WzNWLr9Rp0cetVbHTmAJHyPaQCqowuFA7KAB+U5Dhvjd7hpbPKHlaptT5VKczapKNMH/bP2ILJjAAwWG7Sy8L8abWUpqPKVKnHNWUuF/cgrZ6V5LBtldxv1hqb2FzcT8OsBrnIrblG/KcDpv06xmwZXpEuINitv8AKPzMADwrT8qBju2BjHTPYAdgBiParW16amy+9wlSDLucn6ADcknAAG5JAkNI423AAHTvnH9J5z9uXEmC6bTrnyyLLbOuWdQFQfEDmfb3xAL3xN4vpNtvDr6mWm6lQNVzBgjXV5VrK8ekKcbgnpnpvPJ105UlWGHUlWHsynBH5gz1bjPh/SarU3h1s+80jQJa3PipqrXC8qhTnPIrZJ7kYnBeIKUW/NalanUNWrnmYBS1TZbueepz9YspteGWqp7K4uK4+ZHy5z3F0zPQVNGYx92jGmSMOkuYouSs8mEr08ZKyVeJcZVoUTIwGEyUlS2rE7KMx+wwarMcsu2+GPWyQ08JVpY0Eh6kl4ozKNp4tbTLpq4pfXL0z2pLFm6hC6lJqpYCJ4nov2PVq7alDyh1NL183QsRYp/LH+qeeETo/s8tK6p8fiah0r/9yyyqofLZ2P0k2zS8cPLKT8vY+CcVss80GvKJaUrdWDLYoVTzg9sknb2xLG63sBg9wdprSaWuqpKkA5FH7uBk92PuSTn6yNq47DbBGZWO9TftPJ4+V8PXwM6lcothGTzcuT3VST+mZzvivhx1enZFevzRYj1ZccuQcHcf4GbtAcQ4w51S10jmzXYb1JTFFCCzyrBj965yhGTnkrHpG5hiq2AMG7h1G2d+o+IzvFl30mXV24fhvgtfMHnXMTn1JWprXOf+bZ/9PqITxDpWejjFdCF7KdZp2qpqDO4RE0yLhRuRyqfopnYrVjUdyeYj6H+X9JGji15s1BVqiqa3T6dawreaEe+gWO5L43WxwPSPw5yYY4yejyzuXsDjvDLrdXqWWtjRquFmhLThV89nYhHBPMpwe42zI8H8P6sHgdzVch0dV9WqrZ6y4D1hEZeUkMOp2PT4y04Lrr7dZq67HzTRYKkBCjLM7252A/DU+nUfXO+85ptZc+n1J8zVWebqdGgq82xbMNrbLHGnJccitQUQYZQeQnbrKSPx/wAG62+niNINDfe71uq1NllosFSsnJp2QVnCoA2CGI+G+RfV+HbTxJ9a4r+72aI6WysM/mBzYrtj04K4XGcg79NpW8T0tVb8QsKv5dHDqcB7LWIbk1JbcsctyV1AnOTjqSSTnCqkqvrQ1Fk0mhqsaxn2ruse5mYhjks3knffGTAGfCnAtTw9GpSnT2KC5TWGxqr2q9TolqeWdwxxs3LhicZ2JPDfB3r1er1Ap+7ae9a8abnrfm1C83mXcqEqgOQMA5O5IEV+y8WGh3sV15vLXltcsTbXSq32cuTyc1pfbbZQcbzqs/Pr8YwZH4TtOf8AE12ErXpz2Adf7qM38pe1N6T1+c47x9f5f3S3OyX+of4WRlz9DiIOh0DAKW679T3boo+PScp9qPAGtr096qT5NmNQRk4osK8747hSoyewJPQGdHwXmKjJ2GWBOMY659u4H0lmjk75O/RV22PT9IycFxDxfpV1PEGqtDtd9wGnNQdkdqGYt6wMADmG/ftmc74r1NDuU0624092oqte/wAvd31V1h5Sh/BzmzlyAcYnccU+zjS23JfXzUOGV3SsKaWwwO6HHKTjsQNycEyv8ReDK9Po9deru91tvntzYCKp1JZgqj2DtuST16QOPPq1jKVQWnj9SyNLtRWvEjc2BDtEdS8ZxEPNAxdc5jCiKHUuczIMmbjJWiwmEBhBTIMkxuG2+OciaPDo4lZa2JAaky8emWd2uy8Uvsi66mAuulsqHqDmRqgufJha5GVVjDQWXPgtV+/6YMcI1gDexP4lU/AuqiU6mRXUcjK46oysO26kH+Uhr69PbvEXiammq65RZY1WoTTOB6MXOFORkbqA43xvviMeIuJ+RXYGAuKpzWIgQOKzkKpXubCrIvuc4zjE4zjC26izUaXlHlXfc9SNSGQ32utNaMtKEHL+hm5iMKNzjIMcqZ9VqedsirTNlrqjivV63lO2c5auj1KM59XfqDu5x+A8OWpHsavk1GpdbdSpPMyl12qB/uoGKgfOI6LXtW6qf3LSD0OUIBH16H85bX6nCs2f3UIPtsf6Smu04a9wTy7o2/spIb9JNJ1vKGtRxuGVXGOm2xkdDwNwLSvlixtZ5/MylgaltDIGxg82FG2cA+8l4fPOA3ZVwvcYJz7b9Bv8Zf1nlQnPX2lQ1fwvh/lW6hgeY3X+duMcv7CqoJ13/ss52/F02ldV4RqqpSkX3llsS0Xc1Qt56qRTWNk5QoQD93Odzky+0YG7TTvlukAr+KcMqdb1fJGoQJcMkZQV8nKCOm2enuYHU8HpdrXJszfWabVW25UarBH4AeUMAW9WMjmPvH9Uxz26TbHYbiAQ0GjSpX5MgMxcgkkcxABx7D0/xkDZv1jPN6Dv8P1le2fh3gFiv4Bv1nG+O6/MSsdvMH5d/wBJ11zkIvynLeJX2APufz2GYUj3BdYGoRR1ywfHfktZSPl8Jc0arO+wXsBjJnnvhTXkfeKycDnJVtzyli2fpt+s6LR2EWJnPpyCT7AbwMfx7xSyjR23UsVep6XZsA/s/NTnUj4qT2i/BNM738Z0lhY12Mr1Cws3Kmo0+4XPZcqMDYYkftJVzw3Vqj8tpRSxO2Kw6FwfbKht4zwu8niQ5geZ9KUsyeltS6S3+Gpb/p+UYeXaOvIB+AllXXBWpy2WL/dd1/JyP5QwbaSr2DqNpXWRvUPmL8sVq5NBokIw2hFWDubEAATMgyZkWz0nWdoG9pGq3aDtaUz7L6kwVa5h7RI1rJqoiUxAWSyavaJ3VwlO4kj1h62grBNpFSk0b8yBsskSYKyTFbd54b0lzaesaRCLLg/NxKwh/uVXoS6mpGO7M9TkcuCBcPnO102kSiuuisYrrwB3OefJJPcnmyT3JnEfZVxfke3SsRy2ftKc/wDNUetR81AP+QzvdUvQ9u31z/2mrG+3Ncf1B5eQbADlP+UkYkdcvPeB1BBzj281un1wIDjbeph/iYn5sAc/xjXARlRYx3JwCdsIpJP6kj/LI+6J23CyK6wMZz3z2HSNW67I5RgAf0latgxnfHbHt2kA2ATjsZoa7r1ICjBJ27QKW79D1lPp9QxAHNtjYD5xoWkdzAHHbJ6Q2Tt0iNb9zmOac82TiAStPoG3eLqmcbf7zD3DYD4E/rA6Vd+h2gB7W7YG3ftsJzHGNNkL75yx+GR/v6Tp9QgAxjAx/WV/EKM1O3dUJ+gXMA8n0PEPKsDn8J2sx1wd8/MHeen6FFDKzH1cowBvt+6ce+38J47dfgggA4IOD0ODnBnsXh+wXhLl/s2UHmOcnqenuOh9olWK77UlP/DXVQQbLaUwMktmwHH6fpHNAi/e/NbPP991VJ9ix0unRMk748uhRttkTf2jXBaNMuTmzV1VjAQj1JYMDmIH8fgDA360vbaNwKOKacKXxk8+Q+MdvWRv7SkuG4z6dVqh7ai4fQXNiAN20n4ys5dfqx//AFJ/6lDfzlQb5nW2MNs+8mpidbw4MUVTYxE9SYRHg7Y6iABZkMqzJGl7VCtCYmTISnqNNC1JMmSLVTGGCsFbVMmSoWSvupgkSZMlMxCkEyTJkIQ2kdkZXQ4dSGVh2YHInrn/ABZLNOl65AdemD6WyVZfo2RmZMl/EZuRt1fO7bbdj3zOjtpKVKo6kpX9Du354/WZMkYoXxfYb9x0g77AA3yMyZNDa4YDyjbt/OOnP6zJkcA9S/GWGmAAMyZAAapiCuPbH85vT2gN1MyZADajH+kxfWpmi0Dqa3A+ZQgTJkYeDOcz2nwCifcdMU3yhzzdA4dg/wDqB/ITJkiNc/Rb7Qcs3DwoLEa/TljlFCjmxkhgcjJAwMHfqN5SWj9rxZskIeJcNKqN/UNTUrfIFv0mTJbJyH2jPjies/8AVX/8euUFdmZkyZ1tiZqeHFsyZIaUSp8x2qvM1MlsfppdNNTJkNB//9k="
);
//control functions
window.addEventListener();

//model functions
function randomPosition(): { x: number; y: number } {
  return {
    x: Math.floor(Math.random() * 16),
    y: Math.floor(Math.random() * 14),
  };
}
