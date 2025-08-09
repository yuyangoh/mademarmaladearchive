class WorkItem {
  constructor(title, image, description, details, video = null, id = null, additionalContent = null) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.details = details;
    this.video = video;
    this.id = id || title.toLowerCase().replace(/[^a-z0-9]/g, '-');
    this.additionalContent = additionalContent;
  }

  render() {
    return `
      <div class="grid-item work-item-clickable" data-item-id="${this.id}">
        <h2 class="item-title">${this.title}</h2>
        <img src="${this.image}" alt="${this.title}" class="item-image">
        <p class="item-description">${this.description}</p>
        <p class="item-details">${this.details}</p>
      </div>
    `;
  }
}

// Data array
const workItems = [
  new WorkItem(
    "P-Threads: 3D Printing as a Method for Bonding Textiles",
    "archive images/pthreads-cover.jpg",
    "We reimagined the 3D printer as a machine that bonds textiles and created functional outcomes.",
    "Undergraduate coursework",
    "https://www.youtube.com/embed/6sN0rGHfdy0?si=Ml7lkURhoS8rL_40",
    "p-threads",
    {
      sections: [
        {
          type: "text",
          title: "Abstract",
          content: "This project ..."
        },
        {
          type: "text",
          title: "Process",
          content: "We explored ways of integrating 3D prints with textile materials and created a range of swatches."
        }
      ]
    }
  ),
  new WorkItem(
    "row x row",
    "archive images/rowxrow-cover.png",
    "We created an interactive installation that invites audiences to create knitting patterns. These patterns are knitted in real-time by the machine operator at the venue.",
    "Ars Electronica 2024",
    null, // No video for this item
    "row-x-row",
    {
      sections: [
        {
          type: "text",
          title: "Abstract",
          content: "This project ..."
        },
        {
          type: "text",
          title: "Process",
          content: "We developed 3 interfaces in total: (1) audience input (2) operator instruction (3) entry library."
        }
      ]
    }
  ),
  new WorkItem(
    "Music Conductor",
    "archive images/music-cover.png",
    "A gesture-based interaction that allows people to conduct music virtually. Created with p5.js and MediaPipe Hands.",
    "Undergraduate coursework",
    "https://www.youtube.com/embed/QexbP1xjGa0?si=NbfYcKBusV7Tgops", // Add your video URL here
    "music-conductor",
    {
      sections: [
        {
          type: "text",
          title: "Abstract",
          content: "This project ..."
        },
        {
          type: "text",
          title: "Process",
          content: "I built a p5.js application that uses MediaPipe Hands to detect hand gestures."
        }
      ]
    }
  ),
];

// Render into the section
document.querySelector('.work-archive').innerHTML = workItems
  .map(item => item.render())
  .join('');

// Fun items
class funItem {
  constructor(title, image, description, details) {
    this.title = title;
    this.image = image;
    this.description = description;
    this.details = details;
  }

  render() {
    return `
      <div class="grid-item">
        <h2 class="item-title">${this.title}</h2>
        <img src="${this.image}" alt="${this.title}" class="item-image">
        <p class="item-description">${this.description}</p>
        <p class="item-details">${this.details}</p>
      </div>
    `;
  }
}

// Data array
const funItems = [
  new funItem(
    "Playing with yarn (on-going)",
    "archive images/yarn-cover.jpg",
    "I am learning how to weave. I sometimes knit and crochet.",
    "Textile"
  ),
  new funItem(
    "Performances",
    "archive images/performance-cover.jpg",
    "I play double bass in symphony orchestras.",
    "Music"
  ),
  new funItem(
    "Trying to make things",
    "archive images/trying-cover.jpg",
    "All the things I made when I was a freshman at university.",
    "Industrial design"
  ),
];

// Render into the section
document.querySelector('.for-fun-things').innerHTML = funItems
  .map(item => item.render())
  .join('');

// showing sections
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main section");
  const headers = document.querySelectorAll("header h1");

  function showSection(id) {
    // Toggle section visibility
    sections.forEach(section => {
      if (section.id === id) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    // Toggle header styles
    headers.forEach(header => {
      if (header.querySelector("a").getAttribute("href") === `#${id}`) {
        header.classList.add("header-active");
        header.classList.remove("header-inactive");
      } else {
        header.classList.remove("header-active");
        header.classList.add("header-inactive");
      }
    });
  }

  // Add click listeners to headers
  headers.forEach(header => {
    header.addEventListener("click", e => {
      e.preventDefault(); // prevent default link jump
      const targetId = header.querySelector("a").getAttribute("href").substring(1);
      showSection(targetId);
    });
  });

  // Show section 1 by default
  showSection("section1");

  // Add click listeners for work items
  document.addEventListener('click', (e) => {
    const workItem = e.target.closest('.work-item-clickable');
    if (workItem) {
      const itemId = workItem.dataset.itemId;
      const item = workItems.find(item => item.id === itemId);
      if (item) {
        showItemDetail(item);
      }
    }
  });
});

// Function to render additional content sections
function renderAdditionalContent(additionalContent) {
  if (!additionalContent || !additionalContent.sections) {
    return '';
  }
  
  return additionalContent.sections.map(section => {
    switch (section.type) {
      case 'text':
        return `
          <div class="content-section">
            <h3 class="content-section-title">${section.title}</h3>
            <p class="content-section-text">${section.content}</p>
          </div>
        `;
      case 'image':
        return `
          <div class="content-section">
            <h3 class="content-section-title">${section.title}</h3>
            <img src="${section.src}" alt="${section.alt}" class="content-section-image">
          </div>
        `;
      case 'video':
        return `
          <div class="content-section">
            <h3 class="content-section-title">${section.title}</h3>
            <iframe src="${section.src}" class="content-section-video" frameborder="0" allowfullscreen></iframe>
          </div>
        `;
      default:
        return '';
    }
  }).join('');
}

// Function to display item detail
function showItemDetail(item) {
  const sections = document.querySelectorAll("main section");
  const itemDetailsDiv = document.getElementById('item-details');
  
  // Hide all sections
  sections.forEach(section => {
    section.classList.remove("active");
  });
  
  // Show the item details div and populate it
  itemDetailsDiv.style.display = 'block';
  itemDetailsDiv.innerHTML = `
    <div class="detail-view">
      <button class="back-button" onclick="goBackToArchive()">← Back</button>
      <div class="detail-content">
        <h1 class="detail-title">${item.title}</h1>
        <div class="detail-media">
          <img src="${item.image}" alt="${item.title}" class="detail-image">
          ${item.video ? `<iframe class="detail-video" src="${item.video}" frameborder="0" allowfullscreen></iframe>` : ''}
        </div>
        ${item.additionalContent ? `
          <div class="additional-content">
            ${renderAdditionalContent(item.additionalContent)}
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// Function to go back to archive
function goBackToArchive() {
  const itemDetailsDiv = document.getElementById('item-details');
  itemDetailsDiv.style.display = 'none';
  
  // Show the work archive section
  const workArchiveSection = document.getElementById('section1');
  workArchiveSection.classList.add('active');
}