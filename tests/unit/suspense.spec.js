import { h, defineComponent, Suspense } from 'vue';
import { render } from '@testing-library/vue';

it("renders a async component with a suspense wrapper", async () => {
  const Component = defineComponent({
    async setup() {
      return () => h("div", "AsyncSetup");
    },
  });

  const { findByText } = render(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(Component),
          fallback: h("div", "fallback"),
        });
      },
    })
  );

  expect(await findByText("AsyncSetup")).toBeInTheDocument(); // fails
});