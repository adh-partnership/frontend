<!-- Adapted from https://github.com/Nikolai558/Equipment-Suffix-Generator under MIT license -->

<template>
  <h2 class="text-3xl pb-5">Equipment Suffix Generator</h2>
  <div v-if="suffix">
    <p class="text-4xl text-center pt-5 pb-10 font-medium">
      Equipment suffix: <span class="text-blue-500 font-bold">/{{ suffix }}</span>
    </p>
  </div>
  <div v-else-if="questionIndex < QUESTIONS.length">
    <p class="text-2xl mb-2">{{ QUESTIONS[questionIndex].question }}</p>
    <div>
      <button
        type="button"
        class="text-white dark:text-black bg-slate-700 dark:bg-slate-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 text-center"
        @click="makeChoice(true)"
      >
        Yes
      </button>
      <button
        type="button"
        class="text-white dark:text-black bg-slate-700 dark:bg-slate-300 font-medium rounded-lg text-sm px-5 py-1 text-center"
        @click="makeChoice(false)"
      >
        No
      </button>
    </div>
    <div>
      <p class="pt-15 text-lg mb-2">{{ QUESTIONS[questionIndex].explanationPrimer }}</p>
      <button
        type="button"
        class="text-white dark:text-black bg-slate-700 dark:bg-slate-300 font-medium rounded-lg text-sm px-5 py-1 mr-2 text-center"
        @click="selectedExplanation = SelectedExplanation.Simple"
      >
        Simple Explanation
      </button>
      <button
        type="button"
        class="text-white dark:text-black bg-slate-700 dark:bg-slate-300 font-medium rounded-lg text-sm px-5 py-1 text-center"
        @click="selectedExplanation = SelectedExplanation.Technical"
      >
        Technical Explanation
      </button>
      <p v-if="selectedExplanation !== SelectedExplanation.Neither" class="py-2 text-normal">
        {{
          selectedExplanation === SelectedExplanation.Simple
            ? QUESTIONS[questionIndex].explanationSimple
            : QUESTIONS[questionIndex].explanationTechnical
        }}
        <span v-show="QUESTIONS[questionIndex].infoLink">
          <br />
          <br />
          <a :href="QUESTIONS[questionIndex].infoLink!" class="text-blue-600 dark:text-blue-300 text-lg" target="_blank"
            >More info</a
          >
        </span>
      </p>
    </div>
    <div v-show="QUESTIONS[questionIndex].notes !== null" class="pt-8">
      <p class="text-normal">{{ QUESTIONS[questionIndex].notes }}</p>
    </div>
  </div>
  <div v-else-if="questionIndex === QUESTIONS.length">
    <p>
      It appears you have entered an impossible combination of equipment capabilities or a combination that the FAA does
      not account for. Speak to a controller about your equipment suffix code.
    </p>
  </div>
  <button
    type="button"
    class="mt-15 text-white dark:text-black bg-red-500 font-medium rounded-lg text-sm px-2 py-1 text-center"
    @click="startOver()"
  >
    <i class="fa fa-backward" />
    Start over
  </button>
</template>

<script setup lang="ts">
import { ref, Ref } from "vue";

type QuestionCode = "XPDR" | "MODEC" | "GNSS" | "RNAV" | "RVSM" | "DME" | "TACAN";
type Question = {
  code: QuestionCode;
  question: string;
  explanationPrimer: string;
  explanationSimple: string;
  explanationTechnical: string;
  infoLink: string | null;
  notes: string | null;
};

const QUESTIONS: Question[] = [
  {
    code: "XPDR",
    question: "Do you have a Transponder?",
    explanationPrimer: "What is a Transponder?",
    explanationSimple:
      'If you can input a code that ATC gives you in a device similar to the images at the "More info" link, select YES to this question.',
    explanationTechnical:
      'A transponder is an electronic device that produces a response when it receives a radio-frequency interrogation. Aircraft have transponders to assist in identifying them on Air Traffic Control radar. Collision avoidance systems have been developed to use transponder transmissions as a means of detecting aircraft at risk of colliding with each other. Air Traffic Control units use the term "squawk" when they are assigning an aircraft a transponder code, e.g., "Squawk 7421" Squawk thus can be said to mean "select transponder code" or "squawking xxxx" to mean "I have selected transponder code xxxx".',
    infoLink:
      "https://www.google.com/search?q=airplane+transponder&rlz=1C1CHBD_enUS884US884&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjR5-vG1aTvAhWOMd8KHRo3DgoQ_AUoAnoECBQQBA&biw=1440&bih=797#imgrc=dj86MIjIEMrVDM",
    notes:
      "Warning! On the VATSIM network, simulation of aircraft without a transponder is only permitted with Air Traffic Control approval.",
  },
  {
    code: "MODEC",
    question: "Is your Transponder Mode-C capable?",
    explanationPrimer: 'What is a "Mode-C Transponder"?',
    explanationSimple:
      "If your transponder have the ability to report your altitude to ATC, then answer YES to this question.",
    explanationTechnical: 'See the "More info" link.',
    infoLink: "https://skybrary.aero/articles/transponder",
    notes:
      'The "Mode C" portion of your transponder is usually turned on by selecting the "ALT" option on your transponder. Warning! On the VATSIM network, you must have a transponder that reports altitude to ATC.',
  },
  {
    code: "GNSS",
    question: "Do you have the ability to navigate via Global Navigation Satellite System (GNSS)?",
    explanationPrimer: 'What is "GNSS"?',
    explanationSimple: "If your aircraft uses satellites to navigate, answer YES to this question.",
    explanationTechnical:
      "Global Navigation Satellite System (GNSS) refers to a constellation of satellites providing signals from space that transmit positioning and timing data to GNSS receivers. The receivers then use this data to determine location. By definition, GNSS provides global coverage. Examples of GNSS include Europe's Galileo, the USA's NAVSTAR Global Positioning System (GPS), Russia's Global'naya Navigatsionnaya Sputnikovaya Sistema (GLONASS) and China's BeiDou Navigation Satellite System.",
    infoLink: "https://www.gsa.europa.eu/european-gnss/what-gnss",
    notes: null,
  },
  {
    code: "RNAV",
    question: "Do you have the ability to navigate via RNAV?",
    explanationPrimer: 'What is "RNAV"?',
    explanationSimple:
      'If ATC told you "Cleared direct (any NAVAID or point)", would you be able to type that into your navigation system and go straight to that point?',
    explanationTechnical: 'See the "More info" link.',
    infoLink: "https://www.skybrary.aero/index.php/Area_Navigation_(RNAV)",
    notes: null,
  },
  {
    code: "RVSM",
    question: "Is your aircraft authorized for RVSM flight?",
    explanationPrimer: 'What is "RVSM"?',
    explanationSimple:
      "If you have equipment on your aircraft that allows you to fly at altitudes at and between FL290 and FL410 where ATC only has to provide 1,000ft of separation from you, then answer YES to this question.",
    explanationTechnical: 'See the "More info" link.',
    infoLink: "https://www.faa.gov/air_traffic/separation_standards/rvsm/",
    notes:
      "Answering NO to this question may prevent you from being allowed to fly a cruising altitude at or between FL290 and FL410.",
  },
  {
    code: "DME",
    question: "Do you have DME capability?",
    explanationPrimer: 'What is "DME"?',
    explanationSimple:
      "If your aircraft has the ability to tell how far away you are from a point or NAVAID, answer YES to this question.",
    explanationTechnical: 'See the "More info" link.',
    infoLink:
      "https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gbng/lpdme/",
    notes: null,
  },
  {
    code: "TACAN",
    question: "Do you have the ability to navigate via TACAN?",
    explanationPrimer: 'What is "TACAN"?',
    explanationSimple:
      "Generally speaking, unless you are flying a military aircraft, you will likely answer NO to this question.",
    explanationTechnical:
      "A tactical air navigation system (TACAN) is a navigation system used by military aircraft. It provides the user with bearing and distance (slant-range or hypotenuse) to a ground or ship-borne station. It is a more accurate version of the VOR/DME system that provides bearing and range information for civil aviation. Aircraft equipped with TACAN avionics can use this system for en route navigation as well as non-precision approaches to landing fields.",
    infoLink: null,
    notes: null,
  },
];

enum Answer {
  Yes = 0,
  No = 1,
  Unselected = 2,
}

enum Matcher {
  Yes = 0,
  No = 1,
  Any = 2,
}

enum SelectedExplanation {
  Neither = 0,
  Simple = 1,
  Technical = 2,
}

// Transponder, Mode C, GNSS, RNAV, RVSM, DME, TACAN
const EQUIPMENT: [[Matcher, Matcher, Matcher, Matcher, Matcher, Matcher, Matcher], string][] = [
  [[Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No], "X"],
  [[Matcher.Yes, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No], "T"],
  [[Matcher.Yes, Matcher.Yes, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No], "U"],

  [[Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.Yes, Matcher.No], "D"],
  [[Matcher.Yes, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.Yes, Matcher.No], "B"],
  [[Matcher.Yes, Matcher.Yes, Matcher.No, Matcher.No, Matcher.No, Matcher.Yes, Matcher.No], "B"],

  [[Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.Yes], "M"],
  [[Matcher.Yes, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.Yes], "N"],
  [[Matcher.Yes, Matcher.Yes, Matcher.No, Matcher.No, Matcher.No, Matcher.No, Matcher.Yes], "P"],

  [[Matcher.No, Matcher.No, Matcher.No, Matcher.Yes, Matcher.No, Matcher.Any, Matcher.Any], "Y"],
  [[Matcher.Yes, Matcher.No, Matcher.No, Matcher.Yes, Matcher.No, Matcher.Any, Matcher.Any], "C"],
  [[Matcher.Yes, Matcher.Yes, Matcher.No, Matcher.Yes, Matcher.No, Matcher.Any, Matcher.Any], "I"],

  [[Matcher.No, Matcher.No, Matcher.Yes, Matcher.Yes, Matcher.No, Matcher.Any, Matcher.Any], "V"],
  [[Matcher.Yes, Matcher.No, Matcher.Yes, Matcher.Yes, Matcher.No, Matcher.Any, Matcher.Any], "S"],
  [[Matcher.Yes, Matcher.Yes, Matcher.Yes, Matcher.Yes, Matcher.No, Matcher.Any, Matcher.Any], "G"],

  [[Matcher.No, Matcher.No, Matcher.Any, Matcher.Any, Matcher.Yes, Matcher.Any, Matcher.Any], "W"],
  [[Matcher.Yes, Matcher.No, Matcher.Any, Matcher.Any, Matcher.Yes, Matcher.Any, Matcher.Any], "Z"],
  [[Matcher.Yes, Matcher.Yes, Matcher.Any, Matcher.Any, Matcher.Yes, Matcher.Any, Matcher.Any], "L"],
];

const questionIndex = ref(0);
const answers: Ref<Record<QuestionCode, Answer>> = ref({
  XPDR: Answer.Unselected,
  MODEC: Answer.Unselected,
  GNSS: Answer.Unselected,
  RNAV: Answer.Unselected,
  RVSM: Answer.Unselected,
  DME: Answer.Unselected,
  TACAN: Answer.Unselected,
});
const selectedExplanation = ref(SelectedExplanation.Neither);
const suffix: Ref<string | null> = ref(null);

const makeChoice = (yes: boolean): void => {
  selectedExplanation.value = SelectedExplanation.Neither;
  answers.value[QUESTIONS[questionIndex.value].code] = yes ? Answer.Yes : Answer.No;
  questionIndex.value += 1;

  const current = [
    answers.value.XPDR,
    answers.value.MODEC,
    answers.value.GNSS,
    answers.value.RNAV,
    answers.value.RVSM,
    answers.value.DME,
    answers.value.TACAN,
  ];
  const matching = EQUIPMENT.find(([matchers, _suffix]) => {
    for (let i = 0; i < 7; i += 1) {
      if (matchers[i] !== Matcher.Any && matchers[i].valueOf() !== current[i].valueOf()) {
        return false;
      }
    }
    return true;
  });
  if (matching) {
    suffix.value = matching[1];
  }
};

const startOver = (): void => {
  questionIndex.value = 0;
  answers.value = {
    XPDR: Answer.Unselected,
    MODEC: Answer.Unselected,
    GNSS: Answer.Unselected,
    RNAV: Answer.Unselected,
    RVSM: Answer.Unselected,
    DME: Answer.Unselected,
    TACAN: Answer.Unselected,
  };
  suffix.value = null;
  selectedExplanation.value = SelectedExplanation.Neither;
};
</script>
