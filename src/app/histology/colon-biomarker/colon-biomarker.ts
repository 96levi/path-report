import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-colon-biomarker',
  imports: [ReactiveFormsModule, JsonPipe],
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
        percentageSpecify: [{ value: null, disabled: true }]
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
        msiHighOther: ['']
      })
    });

    /* Bonus: Add logic to dynamically enable/disable the 'Specify percentage' field
    this.pathologyReportForm.get('her2Ihc.percentageTumorCells').valueChanges.subscribe(value => {
      const percentageSpecifyControl = this.pathologyReportForm.get('her2Ihc.percentageSpecify');
      if (value === 'specify') {
        percentageSpecifyControl.enable();
      } else {
        percentageSpecifyControl.disable();
        percentageSpecifyControl.reset();
      }
    }); */
  }

  // Helper getters for easy access in the template
  get her2Tests() { return this.pathologyReportForm.get('her2TestsPerformed') as FormGroup; }
  get her2Ihc() { return this.pathologyReportForm.get('her2Ihc') as FormGroup; }
  get her2Ish() { return this.pathologyReportForm.get('her2Ish') as FormGroup; }
  get her2Genomic() { return this.pathologyReportForm.get('her2Genomic') as FormGroup; }

  onSubmit(): void {
    if (this.pathologyReportForm.valid) {
      console.log('Form Submitted!', this.pathologyReportForm.value);
      
      // MMR Testing Output
      this.pathologyReportForm.controls['mmrTesting'].value.done ? this.outputData = "IHC testing for MMR protein: \n" : this.outputData = "";
      this.pathologyReportForm.value.mmrTesting.mlh1Result ? this.outputData += `\tMLH1: ${this.pathologyReportForm.value.mmrTesting.mlh1Result}. ${this.pathologyReportForm.value.mmrTesting.mlh1Explain}\n` : '';
      this.pathologyReportForm.value.mmrTesting.msh2Result ? this.outputData += `\tMSH2: ${this.pathologyReportForm.value.mmrTesting.msh2Result}. ${this.pathologyReportForm.value.mmrTesting.msh2Explain}\n` : '';
      this.pathologyReportForm.value.mmrTesting.msh6Result ? this.outputData += `\tMSH6: ${this.pathologyReportForm.value.mmrTesting.msh6Result}. ${this.pathologyReportForm.value.mmrTesting.msh6Explain}\n` : '';
      this.pathologyReportForm.value.mmrTesting.pms2Result ? this.outputData += `\tPMS2: ${this.pathologyReportForm.value.mmrTesting.pms2Result}. ${this.pathologyReportForm.value.mmrTesting.pms2Explain}\n` : '';
      this.pathologyReportForm.value.mmrTesting.backgroundControl ? this.outputData += '\tBackground nonneoplastic tissue / internal control present.' : '';

      this.outputData += `\nIHC Interpretation: ${this.pathologyReportForm.value.ihcInterpretation}.\n`;

    } else {
      console.log('Form is invalid');
    }
  }
}
