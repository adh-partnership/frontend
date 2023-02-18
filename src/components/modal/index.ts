import { defineComponent, h, RendererNode, VNode } from "vue";

export default defineComponent({
  name: "Modal",
  props: {
    showClose: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
  },
  emits: ["close"],
  methods: {
    generateClose(): VNode<RendererNode> | null {
      if (this.showClose) {
        return h(
          "button",
          {
            type: "button",
            class:
              "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-l text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white",
            onClick: () => {
              this.$emit("close");
            },
          },
          [
            h("i", {
              class: "fas fa-xmark w-4",
            }),
            h(
              "span",
              {
                class: "sr-only",
              },
              ["Close Modal"]
            ),
          ]
        );
      }

      return null;
    },
    generateFooter(): VNode<RendererNode> | null {
      if (this.$slots.footer) {
        return h(
          "div",
          {
            class: "flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600",
          },
          [this.$slots.footer()]
        );
      }

      return null;
    },
  },
  render() {
    return h(
      "div",
      {
        class: "absolute inset-0 flex items-center justify-center bg-black-deep bg-opacity-70",
        onClick: () => {
          if (this.showClose) {
            this.$emit("close");
          }
        },
        onKeydown: (e: KeyboardEvent) => {
          if (e.key === "Escape" && this.showClose) {
            this.$emit("close");
          }
        },
      },
      [
        h(
          "div",
          {
            class: "relative bg-white rounded-lg shadow dark:bg-black-light w-5/6 md:w-1/3",
          },
          [
            h(
              "div",
              {
                class: "flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600",
              },
              [
                h(
                  "h3",
                  {
                    class: "text-xl font-semibold text-gray-900 dark:text-white m-0",
                  },
                  this.$slots.title?.() || this.title
                ),
                this.generateClose(),
              ]
            ),
            h(
              "div",
              {
                class: "p-6 space-y-6",
              },
              [this.$slots.default?.()]
            ),
            this.generateFooter(),
          ]
        ),
      ]
    );
  },
});
