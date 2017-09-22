import Vue from 'vue';
import UserDetail from '@/components/UserDetail';
import store from '@/store';
import moxios from 'moxios';

const usernameToTest = 'nodejs';
const sampleResponse = [
  {
    id: 67543822,
    name: 'abi-stable-node',
    full_name: 'nodejs/abi-stable-node',
  }, {
    id: 67543905,
    name: 'abi-stable-node-addon-examples',
    full_name: 'nodejs/abi-stable-node-addon-examples',
  }, {
    id: 37962567,
    name: 'api',
    full_name: 'nodejs/api',
  },
];

const createInstance = () => {
  const Constructor = Vue.extend(UserDetail);
  const vm = new Constructor({
    propsData: {
      username: usernameToTest,
    },
    store,
  }).$mount();
  return vm;
};

describe('UserDetail.vue', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    const vm = createInstance();
    expect(vm.username).to.equal(usernameToTest);
  });

  it('should request to github', (done) => {
    const vm = createInstance();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: sampleResponse,
      }).then(() => {
        expect(vm.repos).to.equal(sampleResponse);
        done();
      });
    });
  });

  it('should load from cache on second call', () => {
    const vm = createInstance();

    // Seed cache
    vm.userDetailCache[usernameToTest] = sampleResponse;

    vm.show(usernameToTest);
    expect(vm.repos).to.equal(sampleResponse);
  });
});
