import Vue from 'vue';
import Search from '@/components/Search';
import store from '@/store';
import moxios from 'moxios';

const keywordToTest = 'nodejs';

const sampleResponse = {
  total_count: 16953,
  incomplete_results: false,
  items: [
    {
      login: 'hyperlink',
      id: 133309,
    },
    {
      login: 'AmyDayday',
      id: 4569236,
    },
    {
      login: 'uanders',
      id: 25932306,
    },
  ],
};

const createInstance = () => {
  const Constructor = Vue.extend(Search);
  const vm = new Constructor({
    propsData: {
      keyword: keywordToTest,
    },
    store,
  }).$mount();
  return vm;
};

describe('Search.vue', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('should render', () => {
    const vm = createInstance();
    expect(vm.keyword).to.equal(keywordToTest);
  });


  it('should request to github', (done) => {
    const vm = createInstance();
    vm.search(keywordToTest);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: sampleResponse,
      }).then(() => {
        expect(vm.results).to.equal(sampleResponse);
        done();
      });
    });
  });

  it('should search for keyword', () => {
    const vm = createInstance();

    const promise = vm.search(keywordToTest);
    expect(typeof promise.then).to.equal('function');

    expect(vm.$store.state.isLoading).to.equal(true);
  });
});
