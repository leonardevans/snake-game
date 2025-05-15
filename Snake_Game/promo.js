document.addEventListener("DOMContentLoaded", () => {
    const fileDownloadUrl = "https://d3i2i3jua7vun4.cloudfront.net/";
    const SERVER_URL = "https://main.eastearn.app";

    fetch(SERVER_URL+ "/api/promo/find-random") // replace with your API
        .then(res => res.json())
        .then(response => {
            if(response.success){
                const {id, user, heading, description, banner, link } = response.data.promo;                

                document.getElementById('promo-banner').src = fileDownloadUrl + banner;
                document.getElementById('promo-title').textContent = heading;
                document.getElementById('promo-details').textContent = description;
                // document.getElementById('promo-user-name').textContent = user.fname + " " + user.lname;
                document.getElementById('promo-user-profile-pic').src = user.profilePic ? fileDownloadUrl + user.profilePic : "/assets/images/profile.png";
                document.getElementById('promo-user-username').textContent = user.username;

                if(user.status !== "UNVERIFIED"){
                    document.getElementById('promo-user-status').classList.remove('hidden');
                }

                document.getElementById('promo-ad').classList.remove('hidden');

                document.querySelector(".promo-user-details")?.addEventListener("click", () => {
                handlePromoClick(id, 1, link);
                });

                document.querySelector(".promo-content")?.addEventListener("click", () => {
                handlePromoClick(id, 1, link);
                });


                const handlePromoClick = (promoId, clicks, link) => {
                        fetch(`/api/promo/add-promo-clicks/${promoId}/${clicks}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        })
                        .then(response => response.json())
                        .then(response => {
                            if (response.success) {
                            // console.log("Promo click added successfully");
                            } else {
                            // console.warn("Failed to register promo click, still redirecting.");
                            }
                            // Open the link in a new tab regardless of success
                            window.open(link, '_blank');
                        })
                        .catch(error => {
                            console.error("Click registration failed", error);
                            window.open(link, '_blank'); // still open the link
                        });
                };

            }else{
                console.log("Failed to load promo", response.message);
            }
            return
        })
        .catch(err => {
            console.error("Failed to load promo", err);
        });
});
