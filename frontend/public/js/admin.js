document.addEventListener('DOMContentLoaded', function() {
  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
  });

  // Global search handler
  window.globalSearchHandler = function() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    // Implement search logic here
  };

  // Function to go to home
  window.goHome = function() {
    window.location.href = '/';
  };

  // Withdraw funds function
  window.withdrawFunds = function() {
    const amount = document.getElementById('withdrawAmount').value;
    // Implement withdrawal logic here
  };

  // Quiz form submission
  const quizForm = document.getElementById('quizForm');
  quizForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const question = document.getElementById('quiz-question').value;
    const answer = document.getElementById('quiz-answer').value;
    const timer = document.getElementById('quiz-timer').value;
    // Implement quiz posting logic here
  });

  // Function to fetch and display blog posts
  function fetchBlogPosts() {
fetch('/api/blogs')
      .then(response => response.json())
      .then(posts => {
        const postsContainer = document.getElementById('postsContainer');
        postsContainer.innerHTML = ''; // Clear existing posts
        posts.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <button onclick="deletePost('${post.id}')">Delete</button>
          `;
          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => {
        console.error('Error fetching blog posts:', error);
      });
  }

  // Function to delete a blog post
  function deletePost(postId) {
    fetch(`/api/blog/${postId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        fetchBlogPosts(); // Refresh the posts after deletion
      } else {
        console.error('Error deleting post:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
  }

  // Combined blog post and multimedia upload form submission
  const blogPostForm = document.getElementById('blogPostForm');
  blogPostForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('blog-title').value;
    const content = document.getElementById('blog-content').value;

    // Create FormData object
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    
    const mediaFiles = document.getElementById('blog-media').files;
    for (let i = 0; i < mediaFiles.length; i++) {
        formData.append('media', mediaFiles[i]);
    }

    fetch('/api/blog', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Blog post submitted:', data);
        // Handle success (e.g., show a success message)
        fetchBlogPosts(); // Fetch and display updated posts
    })
    .catch(error => {
        console.error('Error submitting blog post:', error);
        // Handle error (e.g., show an error message)
    });
  });

  // Role management form submission
  const roleForm = document.getElementById('roleForm');
  roleForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const roleName = document.getElementById('role-name').value;
    // Implement role creation logic here
  });

  // Bulk actions
  window.approveSelectedUsers = function() {
    // Implement approval logic here
  };

  window.deleteSelectedPosts = function() {
    // Implement deletion logic here
  };

  // Export data function
  window.exportData = function(type) {
    // Implement export logic here
  };

  // Function to go to the request form for joining a quiz
  window.goToRequestForm = function() {
    window.location.href = '/request-form.html'; // Adjust the path as necessary
  };

  // Function to handle real-time updates for blog posts
  function updateBlogPosts() {
    fetchBlogPosts(); // Fetch and display updated blog posts
  }

  // Call the update function periodically
  setInterval(updateBlogPosts, 5000); // Update every 5 seconds

  // Initial fetch of blog posts on page load
  fetchBlogPosts();

  // Function to handle approval of quiz requests
  window.approveQuizRequest = function(requestId) {
    // Implement logic to approve quiz request
  };

  // Function to handle decline of quiz requests
  window.declineQuizRequest = function(requestId) {
    // Implement logic to decline quiz request
  };

  // Initial fetch of blog posts on page load
  fetchBlogPosts();
});
