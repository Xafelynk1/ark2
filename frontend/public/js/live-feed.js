const liveFeedContainer = document.getElementById('liveFeedContainer');
function updateLiveFeed(message) {
    const feedItem = document.createElement('p');
    feedItem.textContent = message;
    liveFeedContainer.prepend(feedItem);
    if (liveFeedContainer.children.length > 10) {
        liveFeedContainer.removeChild(liveFeedContainer.lastChild);
    }
}

setInterval(() => {
    updateLiveFeed('New event update: ' + new Date().toLocaleTimeString());
}, 5000);
