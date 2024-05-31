import { defineComponent, h } from "vue";
import DOMPurify from "dompurify";

export default defineComponent({
  name: "TrainingNoteComment",
  props: {
    comments: {
      type: String,
      required: true,
    },
  },
  computed: {
    commentsDisplay() {
      return DOMPurify.sanitize(this.comments.replaceAll("\n", "<br>"));
    },
  },
  render() {
    return h("p", { innerHTML: this.commentsDisplay }, []);
  },
});
