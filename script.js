async function generateComic() {
    const storyPrompt = document.getElementById("storyPrompt").value;
    const characterName = document.getElementById("characterName").value;
    const setting = document.getElementById("setting").value;
    const tone = document.getElementById("tone").value;
    const artStyle = document.getElementById("artStyle").value;

    if (!storyPrompt || !characterName || !setting) {
        alert("Please fill in the story, character name and setting.");
        return;
    }

    const prompt = `
Create a short comic story.

Story idea: ${storyPrompt}
Main character: ${characterName}
Setting: ${setting}
Tone: ${tone}
Art style: ${artStyle}

Create 5 comic panels.
For each panel give:
1. Scene description
2. Character dialogue
3. Narration
`;

    try {
        const response = await fetch("/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
           body: JSON.stringify({
    story_prompt: document.getElementById("storyPrompt").value,
    character: document.getElementById("characterName").value,
    setting: document.getElementById("setting").value,
    tone: document.getElementById("tone").value,
    art_style: document.getElementById("artStyle").value
})
        });

        const data = await response.json();

        if (data.success) {
            displayResult(data.answer);
        } else {
            alert("Something went wrong.");
        }

    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}


function displayResult(answer) {
    let resultBox = document.getElementById("result");

    if (!resultBox) {
        resultBox = document.createElement("div");
        resultBox.id = "result";
        document.body.appendChild(resultBox);
    }

    resultBox.innerHTML = `
        <h2>Your AI Comic Story</h2>
        <pre>${answer}</pre>
    `;
}