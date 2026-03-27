export async function onRequestGet(context) {
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const client_id = context.env.GITHUB_CLIENT_ID;
  const client_secret = context.env.GITHUB_CLIENT_SECRET;

  try {
    // We explicitly exchange the code for an access token on the server-side to bypass GitHub's strict CORS rules!
    const response = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
      }),
    });
    
    const data = await response.json();
    const token = data.access_token;
    
    // Inject the successfully generated token directly back into the Decap CMS window environment
    const provider = 'github';
    const responseBody = `
      <script>
        const message = {
          token: '${token}',
          provider: '${provider}'
        };
        window.opener.postMessage(
          'authorization:github:success:' + JSON.stringify(message),
          '*'
        );
        window.close();
      </script>
    `;
    
    return new Response(responseBody, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    return new Response(error.message, { status: 500 });
  }
}
