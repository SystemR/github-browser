import Vue from 'vue';
import Hello from '@/components/Hello';

describe('Hello.vue', () => {
  it('should render', () => {
    const Constructor = Vue.extend(Hello);
    const vm = new Constructor().$mount();
    expect(vm.$el.textContent.trim())
      .to.equal('Welcome to Github repo browser. Start by searching the user you want to browse');
  });
});
