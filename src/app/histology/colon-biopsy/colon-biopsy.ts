import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-colon-biopsy',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './colon-biopsy.html',
  styleUrl: './colon-biopsy.css',
})
export class ColonBiopsy {
  pathologyReportForm!: FormGroup;
  outputData = "";

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.pathologyReportForm = this.fb.group({
      // Specimen
      specimen: this.fb.group({
        procedure: [''],
        procedureOther: [''],
        specimenIntergrity: [''],
      }),

      // Tumor
      tumor: this.fb.group({
        // Site
        site: [''],
        siteOther: [''],

        // Histologic Type
        histologicType: [''],
        histologicTypeOther: [''],
        histologicExplanation: [''],
        histologicComment: [''],

        // Histologic Grade 
        histologicGrade: [''],
        histologicGradeOther: [''],
        histologicGradeExplain: [''],

        // Size of Invasive Carcinoma 
        sizeGreatestDimension: [''],
        sizeAdditionalDimensions: [''],
        sizeExplain: [''],

        // Tumor Extent 
        tumorExtent: [''],
        tumorExtentExplain: [''],

        // Depth of Sub-mucosal Invasion
        depthSubmucosalInvasion: [''],
        depthExact: [''],
        depthexplain: [''],

        // Lymphatic and / or Vascular Invasion
        lymphaticVascularInvasion: [''],
        lymphaticVascularInvasionExplain: [''],

        // Perineural Invasion
        perineuralInvasion: [''],
        perineuralInvasionExplain: [''],

        // Tumor Budding Score
        tumorBudding: [''],
        tumorBuddingExplain: [''],
        // Number of Tumor Buds
        numberTumorBuds: [''],
        tumorBudsOther: [''],
        tumorBudsExplain: [''],

        // Type of Polyp in which Invasive Carcinoma Arose
        typeOfPolyp: [''],
        typeOfPolypOther: [''],
        // Polyp Size (required only for polypectomy specimens) 
        polypGreatestDimension: [''],
        polypAdditionalDimensions: [''],
        polypSizeExplain: [''],
        // Polyp Configuration (required only for polypectomy specimens) 
        polypConfiguration: [''],
        stalkLength: [''],
        stalkLengthOther: [''],
        stalkLengthExplain: [''],

        // Tumor Dimension(s) (required only for intact endoscopic mucosal resections / transanal disk excision / endoscopic mucosal dissection)
        tumorDimensions: [''],
        tumorAdditionalDimensions: [''],
        tumorDimensionsExplain: [''],

        // Margin Orientation Status (required only if applicable) 
        marginOrientationStatus: [''],

        // Number of Specimen Fragments (required only if specimen is fragmented)
        numberSpecimenFragments: [''],
        numberSpecimenFragmentsExactNumber: [''],
        // Dimension of Largest Fragment
        dimensionLargestFragment: [''],
        dimensionLargestFragmentAdditional: [''],
        dimensionLargestFragmentExplain: [''],

        // Tumor Comment
        tumorComment: [''],

      }),

      // Margins
      margins: this.fb.group({
        // Margin Status for Invasive Carcinoma
        marginStatusInvasiveCarcinoma: [''],
        marginStatusInvasiveCarcinomaOther: [''],
        marginStatusInvasiveCarcinomaExplain: [''],
        // Distance from Invasive Carcinoma to Deep / Stalk Margin
        distanceFromInvasiveCarcinomaDeepStalkMargin: [''],
        distanceFromInvasiveCarcinomaDeepStalkMarginExact: [''],
        distanceFromInvasiveCarcinomaDeepStalkMarginOther: [''],
        distanceFromInvasiveCarcinomaDeepStalkMarginExplain: [''],
        // Distance from Invasive Carcinoma to Peripheral / Lateral Mucosal Margin
        distanceFromInvasiveCarcinomaPeripheralLateralMucosalMargin: [''],
        distanceFromInvasiveCarcinomaPeripheralLateralMucosalMarginExact: [''],
        distanceFromInvasiveCarcinomaPeripheralLateralMucosalMarginOther: [''],
        distanceFromInvasiveCarcinomaPeripheralLateralMucosalMarginExplain: [''],
        // Margin(s) Involved by Invasive Carcinoma (select all that apply)
        marginInvolvedByInvasiveCarcinoma: [''],
        marginInvolvedByInvasiveCarcinomaOther: [''],
        marginInvolvedByInvasiveCarcinomaExplain: [''],
        // Margin Status for Non-Invasive Tumor (select all that apply)
        marginStatusNonInvasiveTumorSelect: [''],
        marginStatusNonInvasiveTumorAdenomaAtMucosalMargin: [''],
        marginStatusNonInvasiveTumorOther: [''],
        marginStatusNonInvasiveTumorExplain: [''],
        // Margin Comment
        marginComment: [''],
      }),

      // Additional Findings
      additionalFindings: this.fb.group({
        findings: [''],
        findingsOther: [''],
      }),

      // Special Studies (Note H)

      // Comments
      comments: ['']


    });
  }

  onSubmit(): void {
    if (this.pathologyReportForm.valid) {
      console.clear();
      console.log('Form Submitted!', this.pathologyReportForm.value);
      this.outputData = "";
      const data = this.pathologyReportForm.value;

      // Specimen
      if (data.specimen.procedure) {
        this.outputData += `SPECIMEN\n`;
        this.outputData += `\tProcedure: `;
        this.outputData += `${data.specimen.procedure} ${data.specimen.procedure == 'Other (specify)' ? `${data.specimen.procedureOther}` : ''}\n`;
        this.outputData += `\tSpecimen Integrity: `;
        this.outputData += `${data.specimen.specimenIntergrity}\n\n`;
      }

      // Tumor
      if (data.tumor.site || data.tumor.histologicType || data.tumor.histologicGrade) {
        this.outputData += `TUMOR\n`;
        // Site
        if (data.tumor.site) {
          this.outputData += `\tTumor Site: `;
          this.outputData += `${data.tumor.site} ${data.tumor.site == 'Other (specify)' ? `${data.tumor.siteOther}` : ''}\n`;
        }
        // Histologic Type
        if (data.tumor.histologicType) {
          this.outputData += `\tHistologic Type: `;
          this.outputData += `${data.tumor.histologicType} ${data.tumor.histologicType == 'Other (specify):' ? `${data.tumor.histologicTypeOther}` : ''}\n`;
          if (data.tumor.histologicComment) {
            this.outputData += `\tHistologic Type Comment: ${data.tumor.histologicComment}\n`;
          }
        }
        // Histologic Grade
        if (data.tumor.histologicGrade) {
          this.outputData += `\tHistologic Grade: `;
          this.outputData += `${data.tumor.histologicGrade} ${['Other (specify):', 'Not applicable (specify):'].includes(data.tumor.histologicGrade) ? `${data.tumor.histologicGradeOther}` : ''}\n`;
          if (data.tumor.histologicGradeExplain) {
            this.outputData += `\t${data.tumor.histologicGradeExplain}\n`;
          }

          // Size of Invasive Carcinoma
          if (data.tumor.sizeGreatestDimension || data.tumor.sizeAdditionalDimensions || data.tumor.sizeExplain) {
            this.outputData += `\tSize of Invasive Carcinoma: \n`;
            if (data.tumor.sizeGreatestDimension) {
              this.outputData += `\t\tGreatest dimension in Centimeters (cm): ${data.tumor.sizeGreatestDimension} cm\n`;
            }
            if (data.tumor.sizeAdditionalDimensions) {
              this.outputData += `\t\tAdditional Dimension in Centimeters (cm): ${data.tumor.sizeAdditionalDimensions} cm\n`;
            }
            if (data.tumor.sizeExplain) {
              this.outputData += `\t\tSize cannot be determined (explain):${data.tumor.sizeExplain}\n`;
            }
          }
        }



        this.outputData += `\n`;
      }
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


/* Reference document:
SPECIMEN
Procedure
___ Excisional biopsy (polypectomy)
___ Endoscopic mucosal resection (EMR)
___ Endoscopic submucosal dissection (ESD)
___ Transanal disk excision
___ Other (specify): _________________
___ Not specified
+Specimen Integrity
___ Intact
___ Fragmented
TUMOR
Tumor Site (Note A)
___ Cecum: _________________
___ Ileocecal valve: _________________
___ Ascending colon: _________________
___ Hepatic flexure: _________________
___ Transverse colon: _________________
___ Splenic flexure: _________________
___ Descending colon: _________________
___ Sigmoid colon: _________________
___ Rectosigmoid region: _________________
___ Rectum: _________________
___ Other (specify): _________________
___ Not specified
Histologic Type (Note B)
___ Adenocarcinoma
___ Mucinous adenocarcinoma
___ Signet-ring cell carcinoma (poorly cohesive carcinoma)
___ Medullary adenocarcinoma
___ Serrated adenocarcinoma
___ Micropapillary carcinoma
___ Adenoma-like adenocarcinoma
___ Adenosquamous carcinoma
___ Undifferentiated carcinoma
___ Carcinoma with sarcomatoid component
___ Large cell neuroendocrine carcinoma
___ Small cell neuroendocrine carcinoma
___ Mixed neuroendocrine-non-neuroendocrine neoplasm
___ Other histologic type not listed (specify): _________________
___ Carcinoma, type cannot be determined: _________________
+Histologic Type Comment: _________________
Histologic Grade (Note C)
___ G1, well differentiated
___ G2, moderately differentiated
___ G3, poorly differentiated
___ G4, undifferentiated
___ Other (specify): _________________
___ GX, cannot be assessed: _________________
___ Not applicable: _________________
+Size of Invasive Carcinoma
___ Greatest dimension in Centimeters (cm): _________________ cm
+Additional Dimension in Centimeters (cm): ____ x ____ cm
___ Cannot be determined (explain): _________________
Tumor Extent (Note D)
___ Invades lamina propria
___ Invades muscularis mucosae
___ Invades submucosa
___ Invades muscularis propria
___ Cannot be determined: _________________
+Depth of Sub-mucosal Invasion (Note D)
___ Less than 1 mm
___ Greater than or equal to 1 mm and less than 2 mm
___ Greater than 2 mm
___ Exact depth in Millimeters (mm): _________________ mm
___ Cannot be determined (explain): _________________
Lymphatic and / or Vascular Invasion (Note E) (select all that apply)
___ Not identified
___ Small vessel
___ Large vessel (venous)
___ Present (not otherwise specified)
___ Cannot be determined: _________________
Perineural Invasion (Note E)
___ Not identified
___ Present
___ Cannot be determined: _________________
Tumor Budding Score (Note F)
___ Low (0-4)
___ Intermediate (5-9)
___ High (10 or more)
___ Cannot be determined: _________________
+Number of Tumor Buds (Note F)
___ Specify number in one 'hotspot' field (in an area = 0.785 mm2): _________________ per 'hotspot'
field
___ Other (specify): _________________
___ Cannot be determined: _________________
+Type of Polyp in which Invasive Carcinoma Arose (Note G)
___ Tubular adenoma
___ Villous adenoma
___ Tubulovillous adenoma
___ Traditional serrated adenoma
___ Sessile serrated adenoma / sessile serrated polyp / sessile serrated lesion
___ Hamartomatous polyp
___ Other (specify): _________________
Polyp Size (required only for polypectomy specimens)
___ Not applicable
___ Greatest polyp dimension in Centimeters (cm): _________________ cm
+Additional Polyp Dimension in Centimeters (cm): _________________ cm
___ Cannot be determined (explain): _________________
Polyp Configuration (required only for polypectomy specimens)
___ Not applicable
___ Pedunculated with stalk
+Stalk Length
___ Specify length in Centimeters (cm): _________________ cm
___ Other (specify): _________________
___ Cannot be determined: _________________
___ Sessile
Tumor Dimension(s) (required only for intact endoscopic mucosal resections / transanal disk
excision / endoscopic mucosal dissection)
___ Not applicable
___ Greatest dimension in Centimeters (cm): _________________ cm
+Additional Dimension in Centimeters (cm): ____ x ____ cm
___ Cannot be determined (explain): _________________
Margin Orientation Status (required only if applicable)
___ Not applicable
___ Oriented
___ Unoriented
Number of Specimen Fragments (required only if specimen is fragmented)
___ Not applicable (specimen is intact)
___ Exact number (specify): _________________
___ Cannot be determined
+Dimension of Largest Fragment
___ Greatest dimension of the largest fragment in Centimeters (cm): _________________ cm
+Additional Dimension of the Largest Fragment in Centimeters (cm): ____ x ____ cm
___ Cannot be determined (explain): _________________
+Tumor Comment: _________________
MARGINS
Margin Status for Invasive Carcinoma
___ All margins negative for invasive carcinoma
Distance from Invasive Carcinoma to Deep / Stalk Margin
Specify in Centimeters (cm)
___ Exact distance in cm: _________________ cm
___ Greater than 1 cm
Other
___ Other (specify): _________________
___ Cannot be determined: _________________
___ Not applicable: _________________
+Distance from Invasive Carcinoma to Peripheral / Lateral Mucosal Margin
Specify in Centimeters (cm)
___ Exact distance in cm: _________________ cm
___ Greater than 1 cm
Other
___ Other (specify): _________________
___ Cannot be determined: _________________
___ Not applicable: _________________
___ Invasive carcinoma present at margin
Margin(s) Involved by Invasive Carcinoma (select all that apply)
___ Deep (stalk): _________________
___ Peripheral / lateral mucosal
___ Other (specify): _________________
___ Cannot be determined (explain): _________________
___ Other (specify): _________________
___ Cannot be determined (explain): _________________
___ Not applicable
Margin Status for Non-Invasive Tumor (select all that apply)
___ All margins negative for adenoma
___ Adenoma present at mucosal margin: _________________
___ Other (specify): _________________
___ Cannot be determined (explain): _________________
___ Not applicable
+Margin Comment: _________________
ADDITIONAL FINDINGS
+Additional Findings (select all that apply)
___ None identified
___ Ulcerative colitis
___ Crohn disease
___ Other polyp(s) (specify type[s]): _________________
___ Other (specify): _________________
SPECIAL STUDIES (Note H)
For reporting molecular testing and immunohistochemistry for mismatch repair proteins, and for other cancer biomarker testing
results, the CAP Colorectal Biomarker Template should be used. Pending biomarker studies should be listed in the Comments
section of this report.
COMMENTS
Comment(s): _________________
*/