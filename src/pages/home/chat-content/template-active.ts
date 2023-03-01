export const chatContentActiveTpl = `
  <div class="chat-info">
      <div class="chat-info__user">
          <div class="nav-user__logo">
              {{avatar}}
          </div>
          <p class="chat-info__user-title">{{title}}</p>
      </div>
      {{chatInfoBtn}}
  </div>
  <div class="chat-messages">
      <div class="chat-messages__inner">
          {{messages}}
      </div>
  </div>
  {{form}}
`;
