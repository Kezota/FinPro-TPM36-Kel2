function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'flex';
}

let currentEditMember = null;

let currentTeam = null;

function saveTeamData() {
    const participantsContainer = document.querySelector('#participants-page .accordion-container');
    const teams = Array.from(participantsContainer.getElementsByClassName('accordion-item')).map(team => {
        const teamName = team.querySelector('.accordion-header p').textContent;
        const members = Array.from(team.querySelectorAll('.accordion-content ul li')).map(member => member.textContent);
        return { teamName, members };
    });
    localStorage.setItem('teamData', JSON.stringify(teams));
}

function loadTeamData() {
    const savedData = localStorage.getItem('teamData');
    if (savedData) {
        const teams = JSON.parse(savedData);
        const participantsContainer = document.querySelector('#participants-page .accordion-container');
        
        participantsContainer.innerHTML = '';
        
        teams.forEach(team => {
            const teamHtml = `
                <div class="accordion-item">
                    <div class="accordion-header">
                        <p>${team.teamName}</p>
                        <div class="team-buttons">
                            <button class="team-details" onclick="toggleAccordion()" id="details">View Team Details</button>
                            <button class="edit-team" onclick="editPage()" id="edit">Edit Team</button>
                            <button class="delete-team" onclick="deleteTeam(event)">Delete Team</button>
                        </div>
                    </div>
                    <div id="team-list" class="accordion-content">
                        <ul>
                            ${team.members.map(member => `<li>${member}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            participantsContainer.insertAdjacentHTML('beforeend', teamHtml);
        });

        const editContainer = document.querySelector('.edit-container');
        if (editContainer && teams.length > 0) {
            const members = teams[0].members;
            editContainer.innerHTML = members.map(member => `
                <button class="edit-member" onclick="formPage(this)">
                    <p>${member}</p>
                </button>
            `).join('');
        }
    }
}

function formPage(memberElement) {
    currentEditMember = memberElement;
    document.getElementById('participants-page').style.display = 'none';
    document.getElementById('team-page').style.display = 'none';
    document.getElementById('edit-page').style.display = 'none';
    document.getElementById('form-page').style.display = 'flex';
    
    const fullNameInput = document.getElementById('fullName');
    if (fullNameInput && memberElement) {
        const memberName = memberElement.querySelector('p').textContent;
        fullNameInput.value = memberName.trim().substring(3);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    showPage('participants-page');
    
    const birthAccordContent = document.getElementById('birth-accord-content');
    const indonesianCities = [
        'Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 
        'Makassar', 'Palembang', 'Tangerang', 'Depok', 'Bekasi',
        'Malang', 'Bogor', 'Yogyakarta', 'Surakarta', 'Denpasar'
    ];
    indonesianCities.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        button.onclick = () => selectBirthplace(city);
        button.className = 'city-option';
        birthAccordContent.appendChild(button);
    });

    console.log('DOMContentLoaded event fired');
    
    const birthInput = document.getElementById('birthplace');
    
    if (!birthAccordContent) {
        console.error('Birth accordion content element not found');
        return;
    }
    
    if (!birthInput) {
        console.error('Birthplace input element not found');
        return;
    }

    console.log('Setting up birthplace options');
    
    birthAccordContent.innerHTML = '';
    
    indonesianCities.forEach(city => {
        const button = document.createElement('button');
        button.textContent = city;
        button.type = 'button';
        button.onclick = (e) => {
            e.preventDefault();
            selectBirthplace(city);
        };
        button.className = 'city-option';
        birthAccordContent.appendChild(button);
    });

    birthAccordContent.style.display = 'none';
    
    birthInput.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        toggleBirthAccordion();
    });

    document.addEventListener('click', function(event) {
        if (!birthInput.contains(event.target) && !birthAccordContent.contains(event.target)) {
            birthAccordContent.style.display = 'none';
        }
    });

    loadTeamData();

    const form = document.querySelector('.form-container');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const newName = document.getElementById('fullName').value;
            
            if (currentEditMember) {
                const numberPrefix = currentEditMember.querySelector('p').textContent.split('.')[0] + '. ';
                const teamName = currentEditMember.getAttribute('data-team');
                
                currentEditMember.querySelector('p').textContent = numberPrefix + newName;
                
                const teamNumber = numberPrefix.trim();
                const accordionItems = document.querySelectorAll('.accordion-item');
                accordionItems.forEach(item => {
                    const headerTeamName = item.querySelector('.accordion-header p').textContent;
                    if (headerTeamName === teamName) {
                        const memberList = item.querySelector('.accordion-content ul');
                        if (memberList) {
                            const members = memberList.getElementsByTagName('li');
                            for (let member of members) {
                                if (member.textContent.startsWith(teamNumber)) {
                                    member.textContent = numberPrefix + newName;
                                }
                            }
                        }
                    }
                });
                
                saveTeamData();
            }
            
            document.getElementById('form-page').style.display = 'none';
            document.getElementById('edit-page').style.display = 'none';
            document.getElementById('participants-page').style.display = 'flex';
            
            currentEditMember = null;
            currentTeam = null;
        });
    }

    console.log('Form setup complete');
    console.log('Form element found:', !!form);
});

function toggleDropdown() {
    document.getElementById("drop").classList.toggle("show");
}
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function toggleAccordion() {
    const button = event.target;
    const accordionHeader = button.closest('.accordion-header');
    const accordionContent = accordionHeader.nextElementSibling;
    const detailsButton = button;

    if (accordionContent.style.maxHeight) {
        accordionContent.style.maxHeight = null;
        detailsButton.textContent = "View Team Details"
    } else {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        detailsButton.textContent = "Close Team Details"
    }
}

function editPage() {
    const button = event.target;
    const accordionItem = button.closest('.accordion-item');
    currentTeam = accordionItem.querySelector('.accordion-header p').textContent;
    const members = Array.from(accordionItem.querySelectorAll('.accordion-content ul li')).map(li => li.textContent);
    
    const editContainer = document.querySelector('.edit-container');
    editContainer.innerHTML = members.map(member => `
        <button class="edit-member" onclick="formPage(this)" data-team="${currentTeam}">
            <p>${member}</p>
        </button>
    `).join('');

    document.getElementById('participants-page').style.display = 'none';
    document.getElementById('team-page').style.display = 'none';
    document.getElementById('edit-page').style.display = 'flex';
}

function goBack() {
    document.getElementById('edit-page').style.display = 'none';
    document.getElementById('participants-page').style.display = 'flex';
}

const cvInput = document.getElementById('cv');
  cvInput.addEventListener('change', function () {
    const cvFilename = document.getElementById('cv-filename');
    cvFilename.textContent = cvInput.files[0]?.name || '';
  });

  const flazzCardInput = document.getElementById('flazzCard');
  flazzCardInput.addEventListener('change', function () {
    const flazzFilename = document.getElementById('flazz-filename');
    flazzFilename.textContent = flazzCardInput.files[0]?.name || '';
  });

function deleteTeam(event) {
    const button = event.target;
    const accordionItem = button.closest('.accordion-item');
    const teamName = accordionItem.querySelector('.accordion-header p').textContent;
    
    if (accordionItem) {
        accordionItem.remove();
    }
    
    const participantsContainer = document.querySelector('#participants-page .accordion-container');
    const participantsTeam = Array.from(participantsContainer.getElementsByClassName('accordion-item'))
        .find(item => item.querySelector('.accordion-header p').textContent === teamName);
    if (participantsTeam) {
        participantsTeam.remove();
    }
    
    const teamContainer = document.querySelector('#team-page .accordion-container');
    if (teamContainer) {
        const teamPageTeam = Array.from(teamContainer.getElementsByClassName('accordion-item'))
            .find(item => item.querySelector('.accordion-header p').textContent === teamName);
        if (teamPageTeam) {
            teamPageTeam.remove();
        }
    }
    
    saveTeamData();
}

function sortTeams(sortBy) {
    let accordionContainer = document.querySelector('#team-page .accordion-container');
    if (!accordionContainer) {
        accordionContainer = document.createElement('div');
        accordionContainer.className = 'accordion-container';
        const searchContainer = document.querySelector('#team-page .search-container');
        searchContainer.after(accordionContainer);
    }

    const participantsContainer = document.querySelector('#participants-page .accordion-container');
    const accordionItems = Array.from(participantsContainer.getElementsByClassName('accordion-item'));

    const clonedItems = accordionItems.map(item => item.cloneNode(true));

    clonedItems.sort((a, b) => {
        const teamNameA = a.querySelector('.accordion-header p').textContent.toLowerCase();
        const teamNameB = b.querySelector('.accordion-header p').textContent.toLowerCase();
        
        if (sortBy === 'name-asc') {
            return teamNameA.localeCompare(teamNameB);
        } else if (sortBy === 'name-desc') {
            return teamNameB.localeCompare(teamNameA);
        }
    });

    accordionContainer.innerHTML = '';
    
    clonedItems.forEach(item => {
        accordionContainer.appendChild(item);
    });
}

function searchTeam() {
    const searchInput = document.getElementById('search-input');
    const searchValue = searchInput.value.toLowerCase();
    
    const participantsContainer = document.querySelector('#participants-page .accordion-container');
    const accordionItems = Array.from(participantsContainer.getElementsByClassName('accordion-item'));

    let teamContainer = document.querySelector('#team-page .accordion-container');
    if (!teamContainer) {
        teamContainer = document.createElement('div');
        teamContainer.className = 'accordion-container';
        const searchContainer = document.querySelector('#team-page .search-container');
        searchContainer.after(teamContainer);
    }

    teamContainer.innerHTML = '';

    accordionItems.forEach(item => {
        const teamName = item.querySelector('.accordion-header p').textContent.toLowerCase();
        if (teamName.includes(searchValue)) {
            const clone = item.cloneNode(true);
            teamContainer.appendChild(clone);
        }
    });
}

function toggleBirthAccordion() {
    const birthAccordContent = document.getElementById('birth-accord-content');
    if (!birthAccordContent) {
        console.error('Birth accordion content element not found');
        return;
    }
    birthAccordContent.style.display = birthAccordContent.style.display === 'none' ? 'block' : 'none';
}

function selectBirthplace(city) {
    const birthInput = document.getElementById('birthplace');
    if (!birthInput) {
        console.error('Birthplace input element not found');
        return;
    }
    birthInput.value = city;
    document.getElementById('birth-accord-content').style.display = 'none';
}
