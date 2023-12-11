import type { Controller } from "@/types";
import { defineStore } from "pinia";
import { TrainingNote } from "@/types/index.d";
import { ZDVAPI } from "@/utils/api";

const defaultState: TrainingNote = {
  id: 0,
  controller_id: 0,
  controller: null,
  instructor_id: 0,
  instructor: null,
  position: "",
  duration: "",
  session_date: "",
  type: "",
  comments: "",
};

interface TrainingState {
  form: TrainingNote;
  student: Controller | null;
  currentTrainingNote: TrainingNote;
  fetching: boolean;
  failed: boolean;
}

const useTrainingStore = defineStore("training", {
  state: () =>
    ({
      form: { ...defaultState },
      student: null,
      currentTrainingNote: { ...defaultState },
      fetching: false,
      failed: false,
    }) as TrainingState,
  actions: {
    resetForm() {
      this.copyToForm();
    },
    clearCurrentTrainingNote() {
      this.student = null;
      this.currentTrainingNote = { ...defaultState };
    },
    copyToForm() {
      this.form = { ...this.currentTrainingNote };
      const date = new Date(this.currentTrainingNote.session_date);
      this.form.session_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    async getTrainingNote(cid: string, id: number) {
      this.fetching = true;
      try {
        const { data } = await ZDVAPI.get(`/v1/training/${cid}`);
        this.currentTrainingNote = data.find((t: TrainingNote) => t.id === id) || { ...defaultState };
      } catch (e) {
        this.failed = true;
      } finally {
        this.fetching = false;
      }
    },
  },
});

export default useTrainingStore;
