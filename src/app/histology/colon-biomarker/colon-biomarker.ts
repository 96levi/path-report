import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-colon-biomarker',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './colon-biomarker.html',
  styleUrl: './colon-biomarker.css',
})
export class ColonBiomarker {

  constructor(private fb: FormBuilder) { }

  pathologyReportForm!: FormGroup;
  outputData = "";

  ngOnInit(): void {
    this.pathologyReportForm = this.fb.group({

      // Section: HER2 (Note F)
      her2TestsPerformed: this.fb.group({
        ihc: [false],
        ish: [false],
        genomic: [false]
      }),

      her2Ihc: this.fb.group({
        results: [''],
        resultsExplain: [''],
        scoringSystem: [''],
        scoringSystemOther: [''],
        stainingIntensity: [''],
        stainingIntensityOther: [''],
        percentageTumorCells: [''],
        percentageSpecify: ['']
      }),

      her2Ish: this.fb.group({
        results: [''],
        resultsExplain: [''],
        scoringSystem: [''],
        scoringSystemOther: [''],
        cellsCounted: [null],

        dualProbe: [false],
        dualProbeDetails: this.fb.group({
          ratio: [''],
          avgHer2: [null],
          avgCep17: [null],
          rangeHer2: ['']
        }),

        singleProbe: [false],
        singleProbeDetails: this.fb.group({
          avgHer2: [null],
          rangeHer2: ['']
        })
      }),

      her2Genomic: this.fb.group({
        results: [''],
        resultsPositiveSpecify: [''],
        resultsExplain: ['']
      }),

      // Section: Mismatch Repair (Note A)
      mmrTesting: this.fb.group({
        done: [false],
        mlh1Result: [''],
        mlh1Explain: [''],
        msh2Result: [''],
        msh2Explain: [''],
        msh6Result: [''],
        msh6Explain: [''],
        pms2Result: [''],
        pms2Explain: [''],
        backgroundControl: ['']
      }),

      ihcInterpretation: [''],

      // Section: Microsatellite Instability (MSI)
      msi: this.fb.group({
        done: [false],
        result: [''],
        msiLowDetail: [''],
        msiLowOther: [''],
        msiHighDetail: [''],
        msiHighOther: [''],
        msiExplain: ['']
      }),

      // Additional biomarkers testing
      additionalTestingDone: [false],
      additionalTestingDetails: [''],

      // Comment
      comments: ['']
    });


  }

  // Helper getters for easy access in the template
  get her2Tests() { return this.pathologyReportForm.get('her2TestsPerformed') as FormGroup; }
  get her2Ihc() { return this.pathologyReportForm.get('her2Ihc') as FormGroup; }
  get her2Ish() { return this.pathologyReportForm.get('her2Ish') as FormGroup; }
  get her2Genomic() { return this.pathologyReportForm.get('her2Genomic') as FormGroup; }

  onSubmit(): void {
    if (this.pathologyReportForm.valid) {
      console.log('Form Submitted!', this.pathologyReportForm.value);
      this.outputData = "";
      const data = this.pathologyReportForm.value;

      // MMR Testing Output
      if (data.mmrTesting.done) {
        this.outputData = "IHC testing for MMR protein: \n";
        data.mmrTesting.mlh1Result ? this.outputData += `\tMLH1: ${data.mmrTesting.mlh1Result}. ${data.mmrTesting.mlh1Result == "Cannot be determined" ? data.mmrTesting.mlh1Explain + "." : ""}\n` : '';
        data.mmrTesting.msh2Result ? this.outputData += `\tMSH2: ${data.mmrTesting.msh2Result}. ${data.mmrTesting.msh2Result == "Cannot be determined" ? data.mmrTesting.msh2Explain + "." : ""}\n` : '';
        data.mmrTesting.msh6Result ? this.outputData += `\tMSH6: ${data.mmrTesting.msh6Result}. ${data.mmrTesting.msh6Result == "Cannot be determined" ? data.mmrTesting.msh6Explain + "." : ""}\n` : '';
        data.mmrTesting.pms2Result ? this.outputData += `\tPMS2: ${data.mmrTesting.pms2Result}. ${data.mmrTesting.pms2Result == "Cannot be determined" ? data.mmrTesting.pms2Explain + "." : ""}\n` : '';
        data.mmrTesting.backgroundControl ? this.outputData += `\nBackground Control: Present\n` : '';

        data.ihcInterpretation ? this.outputData += `\nIHC Interpretation: ${data.ihcInterpretation}\n\n` : '';
      }

      // MSI Testing Output
      if (data.msi.done) {
        this.outputData += `MSI Testing: ${data.msi.result}\n`;
        data.msi.result == "MSI-Low (MSI-L)" ? this.outputData += `\tMSI-Low Detail: ${data.msi.msiLowDetail}. ${data.msi.msiLowDetail == "Other" ? data.msi.msiLowOther : ""}\n` : '';
        data.msi.result == "MSI-High (MSI-H)" ? this.outputData += `\tMSI-High Detail: ${data.msi.msiHighDetail}. ${data.msi.msiHighDetail == "Other" ? data.msi.msiHighOther : ""}\n` : '';
        data.msi.result == "MSI-Cannot be determined" ? this.outputData += `\tMSI Result cannot be determined. ${data.msi.msiExplain}.\n` : '';

      }

      // HER2 Testing Output
      if (Object.values(data.her2TestsPerformed).includes(true)) {
        this.outputData += `\nHER2 Testing Performed:`;
        data.her2TestsPerformed.ihc ? this.outputData += `\tIHC\t` : '';
        data.her2TestsPerformed.ish ? this.outputData += `\tISH\t` : '';
        data.her2TestsPerformed.genomic ? this.outputData += `\tGenomic Testing\t` : '';

        // HER2 IHC Output
        if (data.her2TestsPerformed.ihc) {
          this.outputData += `\nHER2 IHC Results: ${data.her2Ihc.results}. ${data.her2Ihc.results == "Cannot be determined" ? data.her2Ihc.resultsExplain + "." : ""}\n`;
          this.outputData += `\tScoring System: ${data.her2Ihc.scoringSystem}. ${data.her2Ihc.scoringSystem == "Other" ? data.her2Ihc.scoringSystemOther + "." : ""}\n`;
          this.outputData += `\tStaining Intensity: ${data.her2Ihc.stainingIntensity}. ${data.her2Ihc.stainingIntensity == "Other" ? data.her2Ihc.stainingIntensityOther + "." : ""}\n`;
          this.outputData += `\tPercentage of Tumor Cells with Specific Membrane Staining: ${data.her2Ihc.percentageTumorCells == "specify" ? data.her2Ihc.percentageSpecify + "%" : data.her2Ihc.percentageTumorCells + "%"}\n`;
        }


        // HER2 ISH Output
        if (data.her2TestsPerformed.ish) {
          this.outputData += `\nHER2 ISH Results: ${data.her2Ish.results}. ${data.her2Ish.results == "Cannot be determined" ? data.her2Ish.resultsExplain + "." : ""}\n`;
          this.outputData += `\tScoring System: ${data.her2Ish.scoringSystem}. ${data.her2Ish.scoringSystem == "Other" ? data.her2Ish.scoringSystemOther + "." : ""}\n`;
          this.outputData += `\tCells Counted: ${data.her2Ish.cellsCounted}\n`;

          if (data.her2Ish.dualProbe) {
            this.outputData += `\tDual Probe Details:\n`;
            this.outputData += `\t\tHER2/CEP17 Ratio: ${data.her2Ish.dualProbeDetails.ratio}\n`;
            this.outputData += `\t\tAverage HER2 Signals per Cell: ${data.her2Ish.dualProbeDetails.avgHer2}\n`;
            this.outputData += `\t\tAverage CEP17 Signals per Cell: ${data.her2Ish.dualProbeDetails.avgCep17}\n`;
            this.outputData += `\t\tRange of HER2 Signals per Cell: ${data.her2Ish.dualProbeDetails.rangeHer2}\n`;
          }

          if (data.her2Ish.singleProbe) {
            this.outputData += `\tSingle Probe Details:\n`;
            this.outputData += `\t\tAverage HER2 Signals per Cell: ${data.her2Ish.singleProbeDetails.avgHer2}\n`;
            this.outputData += `\t\tRange of HER2 Signals per Cell: ${data.her2Ish.singleProbeDetails.rangeHer2}\n`;
          }
        }

        // HER2 Genomic Testing Output
        if (data.her2TestsPerformed.genomic) {
          this.outputData += `\nHER2 Genomic Testing Results: ${data.her2Genomic.results}. ${data.her2Genomic.results == "Positive" ? data.her2Genomic.resultsPositiveSpecify + "." : ""} ${data.her2Genomic.results == "Cannot be determined" ? data.her2Genomic.resultsExplain + "." : ""}\n`;
        }


      }

      // Additional Biomarker Testing Output
      if (data.additionalTestingDone) {
        this.outputData += `\nAdditional Biomarker Testing Performed:\n${data.additionalTestingDetails}\n`;
      }

      // Comment Output
      if (data.comments) {
        this.outputData += `\nComment: ${data.comments}\n`;
      }


    } else {
      console.log('Form is invalid');
    }
  }

  // Button to copy final output to clipboard
  copyToClipboard(): void {
    navigator.clipboard.writeText(this.outputData).then(() => {
      alert('Output data copied to clipboard!');
    }).catch(err => {
      alert('Failed to copy output data to clipboard.');
    });
  }
}
