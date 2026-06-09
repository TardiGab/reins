<template>
  <footer class="footer">
    <div class="footer__content">
      <div class="footer__content-left">
        <NuxtLink to="/" class="footer__logo"></NuxtLink>
        <div class="left">
          <div class="left-top">
            <p class="left-top__p">
              Made with love by
              <a href="https://gabriel-manciu.be" target="_blank">
                Gabriel Manciu
              </a>
            </p>
            <p class="left-top__p">
              &copy; {{ new Date().getFullYear() }} Reins.
            </p>
          </div>
          <div class="left-bottom">
            <p class="left-bottom__p">
              All trademarks mentioned are the property of their respective
              owners.
            </p>
          </div>
        </div>
      </div>
      <div class="footer__content-right">
        <nav class="footer__nav">
          <ul class="footer__nav-list">
            <!-- <li class="footer__nav-item">
              <NuxtLink to="/about" class="footer__nav-link"> About </NuxtLink>
            </li> -->
            <li class="footer__nav-item">
              <NuxtLink to="/credits" class="footer__nav-link">
                Credits
              </NuxtLink>
            </li>
            <li class="footer__nav-item">
              <NuxtLink
                to="https://github.com/TardiGab/reins/issues"
                target="_blank"
                class="footer__nav-link"
              >
                Report an issue
              </NuxtLink>
            </li>
            <!-- <li class="footer__nav-item">
              <NuxtLink to="/privacy-policy" class="footer__nav-link">
                Privacy Policy
              </NuxtLink>
            </li> -->
          </ul>
        </nav>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  margin-top: 2rem;
  padding: 4rem 2rem;
  border-top: 2px solid $border-container;
  position: relative;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.2;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
  &__logo {
    width: 4rem;
    height: 4rem;
    background-image: url("/images/logo.svg");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transition: filter 0.3s ease;
    &:hover {
      filter: brightness(0.7);
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    @media screen and (max-width: 960px) {
      flex-direction: column;
      gap: 2rem;
    }
    &-left,
    &-right {
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    &-left {
      @media screen and (max-width: 960px) {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  }
  &__nav {
    &-list {
      display: flex;
      gap: 2rem;
      padding: 0;
      margin: 0;
      @media screen and (max-width: 960px) {
        flex-direction: column;
        gap: 1rem;
      }
    }
    &-item {
      list-style: none;
    }
    &-link {
      color: white;
      text-decoration: none;
      transition: filter 0.3s ease;
      text-wrap: nowrap;
      &:hover {
        filter: brightness(0.7);
      }
      &:visited {
        color: white;
        filter: brightness(0.7);
      }
    }
  }
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  @media screen and (max-width: 960px) {
    gap: 2rem;
  }

  &-top {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    @media screen and (max-width: 960px) {
      flex-direction: column;
    }
    &__p {
      font-size: 1rem;
      margin: 0;
      a {
        color: $yellow;
        text-decoration: none;
        transition: filter 0.3s ease;
        &:hover {
          filter: brightness(0.7);
        }
        &:visited {
          color: $yellow;
          filter: brightness(0.7);
        }
      }
    }
  }
  &-bottom {
    &__p {
      font-size: 1rem;
      margin: 0;
    }
  }
}
</style>
