import { defineComponent, h } from "vue";
import FAQQuestion from "@/facilities/zan/components/faq/question";

export default defineComponent({
  name: "OceanicFAQ",
  data(): { faq: { question: string; answer: string }[]; expanded: number } {
    return {
      faq: [
        {
          question: "Do I need an Oceanic Clearance?",
          answer:
            "No. The Oceanic Clearance will be handled by the Air Traffic Controllers serving your aircraft prior to entry into the Oceanic airspace. You do need an IFR clearance if you're leaving an airport inside of the Oceanic airspace, but this doubles as an Oceanic clearance.",
        },
        {
          question: "How often do I need to give position reports?",
          answer:
            "If you are in an aircraft that is not ADS-C equipped, you'll need to provide a position report at each compulsary reporting point or every hour, whichever happens first. ADS-C aircraft will be told 'Position reports not required' after SELCAL check and do not need to provide position reports.",
        },
        {
          question: "How do I know if I'm in an ADS-C equipped aircraft?",
          answer:
            "If your aircraft is GNSS capable with FAA equipment codes (/G, /I, /L, or /Z) or has ICAO Equipment L, E, B1, or B2 you are deemed to be ADS-C capable and will be treated with reduced separation and automatic position reporting.",
        },
        {
          question: "How is aircraft equipment like CPDLC and SELCAL simulated?",
          answer: `While operating a modern aircraft, controllers will typically assume you are CPDLC and SELCAL 
capable. If you are not, please ensure your equipment is capable and coordinate this with ATC. <p><b>SELCAL</b>:
Ensure you have a valid SELCAL code with "SEL/" in your remarks. You can find more about SELCAL
<a href="https://www.skybrary.aero/articles/selective-calling-system-selcal" target="_blank">here</a>.
SELCAL is simulated through pilot clients.</p>

<p><b>CPDLC</b> is simulated via Direct Messages. ZAN does not use Hoppie or other CPDLC simulations. Once
VATSIM integrates this into the network, we will shift to this.</p>

<p><a href="https://www.faa.gov/sites/faa.gov/files/FAA%20FPL%20Quick%20Reference%20Brochure%20%282022-09-15%29.pdf"
target="_blank">ICAO equipment codes</a>. Some of the relevant ones are below, and if absent, we'll assume ADS-C, 
CPDLC, RNP4 and SELCAL equipped.</p>

<p><b>Navigation/Communication Equipment (Field 10a)</b></p>

<ul class="mb-4 list-inside list-disc">
<li>J1-J7 CPDLC</li>
<li>R:PBN (must include PBN code in remarks)</li>
</ul>

<p><b>Transponder Equipment (Field 10b)</b></p>

<ul class="mb-4 list-inside list-disc">
<li>D1/G1: ADS-C</li>
</ul>

<p><b>Advanced Services (Field 18)</b></p>

<ul class="list-inside list-disc">
<li>PBN/A1: RNAV 10 (RNP 10)</li>
<li>PBN/L1: RNP4 Capable</li>
</ul>`,
        },
        {
          question: "Can I do increased sim rate/time compression?",
          answer:
            "Typically, yes. Controllers will do their best to accomodate this request. However, if traffic or workload prohibits this, the controller will deny your request.",
        },
        {
          question: "Can I fly VFR in Oceanic Airspace?",
          answer: "Yes, provided you remain outside of Oceanic OCA which is charted.",
        },
      ],
      expanded: -1,
    };
  },
  methods: {
    renderQuestions() {
      return this.faq.map((item, idx) => {
        return h(
          "li",
          {
            class: "my-2 shadow-lg",
            xData: idx,
            onClick: () => {
              this.expanded = this.expanded === idx ? -1 : idx;
            },
          },
          [
            h(FAQQuestion, {
              question: item.question,
              answer: item.answer,
              expanded: this.expanded === idx,
            }),
          ]
        );
      });
    },
  },
  render() {
    return h("div", { class: "oceanic-faq" }, [
      h("h1", "Oceanic FAQ"),
      h("ul", { class: "flex flex-col" }, this.renderQuestions()),
    ]);
  },
});
