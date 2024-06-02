import { defineComponent, h } from "vue";
import DOMPurify from "dompurify";

export default defineComponent({
  name: "ShowHtml",
  props: {
    input: {
      type: String,
      required: true,
    },
  },
  computed: {
    inputDisplay() {
      return DOMPurify.sanitize(this.input.replaceAll("\n", "<br>"));
    },
  },
  render() {
    return h("p", { innerHTML: this.inputDisplay }, []);
  },
});
