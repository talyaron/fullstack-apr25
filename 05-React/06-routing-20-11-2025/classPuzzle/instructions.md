Create a site for candies.

routes:
"/":Login - use timeout to simulate async login, after 2 seconds redirect to /candies
"/candies":CandiesList - list of candies with links to each candy details page
"/candies/marshmello":CandyDetails - details about marshmello candy
"/candies/chocolate":CandyDetails - details about chocolate candy
"/candies/gummy-bears":CandyDetails - details about gummy-bears candy

above the oulet in the candies routes add a navigation with links to each candy details page