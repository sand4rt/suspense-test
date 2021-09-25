import { h, defineComponent, Suspense } from 'vue';
import { renderAsync } from './renderAsync';
import { render } from '@testing-library/vue';

it("renders a async component with a sync render function", async () => {
  const Component = defineComponent({
    async setup() {
      return () => h("div", "AsyncSetup");
    },
  });

  const { queryByText } = render(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(Component),
          fallback: h("div", "fallback"),
        });
      },
    })
  );

  expect(queryByText("AsyncSetup")).not.toBeInTheDocument();
});

it("renders a async component with a async render function", async () => {
  const Component = defineComponent({
    async setup() {
      return () => h("div", "AsyncSetup");
    },
  });

  const { getByText } = await renderAsync(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(Component),
          fallback: h("div", "fallback"),
        });
      },
    })
  );

  expect(getByText("AsyncSetup")).toBeInTheDocument();
});