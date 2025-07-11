    // Initialize the Facebook SDK
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '2344556578659',
            cookie     : true,
            xfbml      : true,
            version    : 'v19.0'
        });
        FB.AppEvents.logPageView();   
    };

    // Handle Facebook Login Button Click
    function facebookLogin() {
        FB.login(function(response) {
            if (response.authResponse) {
                console.log('Welcome! Fetching your information.... ');
                FB.api('/me', {fields: 'name, email'}, function(response) {
                    console.log('Good to see you, ' + response.name + '.');
                    
                    const facebookUserData = {
                        name: response.name,
                        email: response.email
                    };

                    // Send user data to our backend
                    fetch(`${API_BASE_URL}/facebook`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(facebookUserData)
                    })
                    .then(res => res.json())
                    .then(data => {
                        localStorage.setItem("accessToken", data.accessToken);
                        localStorage.setItem("userName", response.name);
                        alert('Facebook Login Successful!');
                        window.location.href = "d.html";
                    })
                    .catch(error => console.error('Error sending Facebook data to backend:', error));
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {scope: 'email'}); // Request email permission
    }
