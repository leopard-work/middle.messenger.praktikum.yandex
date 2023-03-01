export const template = `
    {{tempNav}}
    <main>
        <div class="chat">
            <div class="chat__nav">
                <div class="nav-info">
                    <form class="search">
                        <label>
                            <input type="text" class="input-text" placeholder="{{search_placeholder}}">
                        </label>
                        <button class="search__button"><svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px"><path d="M 19 3 C 13.488281 3 9 7.488281 9 13 C 9 15.394531 9.839844 17.589844 11.25 19.3125 L 3.28125 27.28125 L 4.71875 28.71875 L 12.6875 20.75 C 14.410156 22.160156 16.605469 23 19 23 C 24.511719 23 29 18.511719 29 13 C 29 7.488281 24.511719 3 19 3 Z M 19 5 C 23.429688 5 27 8.570313 27 13 C 27 17.429688 23.429688 21 19 21 C 14.570313 21 11 17.429688 11 13 C 11 8.570313 14.570313 5 19 5 Z"/></svg></button>
                    </form>
                    {{profileLink}}
                </div>
                <div class="nav-users">
                    {{chatList}}
                </div>
            </div>
            {{content}}
        </div>
    </main>
    
    {{chatAddModal}}
    {{chatInfoModal}}
    {{chatAddUserModal}}
    {{chatDeleteUserModal}}
    {{chatAddUserModal}}
    {{errorModal}}
    {{avatarInput}}
`;
