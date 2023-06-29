@http.route('/page/add_numbers', type='http', auth="public", methods=['GET'], website=True)
def get_playlist():
    print("test")
    test = 12
    # token_url = 'https://accounts.spotify.com/api/token'
    # message = f"{Client_ID}:{Client_secret}"
    # messagebase64 = base64.b64encode(message.encode())
    # data={
    #     "grant_type": "client_credentials",
    # }
    # token_header={
    #     "Authorization": f"Basic {messagebase64.decode()}"
    # }

    # r = requests.post(token_url, data=data, headers=token_header)
    # token = r.json()
    return data