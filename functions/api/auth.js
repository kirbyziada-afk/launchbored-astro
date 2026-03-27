export async function onRequestGet(context) {
  const client_id = context.env.GITHUB_CLIENT_ID;
  const url = new URL(context.request.url);
  
  // Dynamically generate the correct callback URL based on the current environment (e.g. dev vs production)
  const redirect_uri = new URL('/api/callback', url.origin).href;
  
  // Redirect the user to the official GitHub authorization page
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=repo,user`;
  
  return Response.redirect(authUrl, 302);
}
