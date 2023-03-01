export const chatListItemTpl = `
  <div class="nav-user__logo">
      {{avatar}}
  </div>
  <div class="nav-user__content">
      <div class="nav-user__title-block">
          <p class="nav-user__title">{{title}}</p>
          <p class="nav-user__date">{{date}}</p>
      </div>
      <div class="nav-user__text-block">
          <p class="nav-user__text">{{last_message}}</p>
          {{unread_count}}
      </div>
  </div>
`;
