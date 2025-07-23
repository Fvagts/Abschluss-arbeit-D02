// IDs der einzelnen Seitenbereiche
const sections = ['start', 'bilder', 'text', 'kontakt', 'social', 'wetter', 'kino'];

document.addEventListener('DOMContentLoaded', function () {
    // Zeigt nur den ersten Bereich an, alle anderen werden ausgeblendet
    sections.forEach((id, idx) => {
        const el = document.getElementById(id);
        if (el) el.style.display = idx === 0 ? 'block' : 'none';
    });

    // Navigation: Klick auf einen Verweis blendet nur den passenden Bereich ein
    document.querySelectorAll('.link-box a').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').replace('#', '');

            // Alle Bereiche ausblenden
            sections.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.style.display = 'none';
            });

            // Nur den ausgewählten Bereich anzeigen
            const target = document.getElementById(targetId);
            if (target) target.style.display = 'block';
        });
    });

    // Kino-Seite: YouTube-Suchleiste für Video-Eingabe und Anzeige
    const youtubeForm = document.getElementById('youtubeSearchForm');
    if (youtubeForm) {
        youtubeForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = document.getElementById('youtubeSearchInput').value.trim();
            // Extrahiert die Video-ID aus einem YouTube-Link oder prüft auf direkte Video-ID
            let videoId = '';
            const regExp = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/;
            const match = input.match(regExp);
            if (match && match[1]) {
                videoId = match[1];
            } else if (/^[A-Za-z0-9_-]{11}$/.test(input)) {
                videoId = input;
            }
            // Zeigt das Video an, wenn eine gültige ID gefunden wurde
            if (videoId) {
                const playerArea = document.getElementById('youtubePlayerArea');
                playerArea.innerHTML = `
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}"
                        title="YouTube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>
                    </iframe>
                `;
            } else {
                alert('Bitte einen gültigen YouTube-Link oder eine Video-ID eingeben!');
            }
        });
    }
});