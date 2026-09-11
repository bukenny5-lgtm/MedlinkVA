# Historical certificate migration

Historical certificates are registered through the Sanity Studio tool **Historical Certificate Migration**. This workflow preserves the real original issue date and creates a new verification-system record timestamp.

## Rules

- `issueDate` is the original historical issue date.
- `verificationRecordCreatedAt` is the migration timestamp.
- `originallyIssuedBeforeVerificationSystem` is set to `true`.
- A genuine prior number belongs in `legacyCertificateNumber`; missing legacy numbers remain blank.
- Standard numbers use the shared allocator and the original issue date.
- Every migrated record receives a new UUID verification token.
- Existing recipient/training/date matches and number collisions block the migration.
- All certificate records and one historical `certificateCohort` are written in one transaction.

## Workflow

Enter the shared historical metadata, recipients, optional legacy numbers, and existing signatory references. Review the dry-run preview and proposed numbers, then explicitly confirm the migration. The reference certificate PDF and its names are not imported automatically.

Historical cohorts can be reopened through **Issued Cohorts**. Existing cohort PDF and ZIP actions reuse the same finalized renderer and QR verification flow. Revoked records retain the existing PDF-generation restrictions.

## Rollback guidance

Do not delete records automatically. Identify a migration by its historical cohort title, `historical: true`, `createdAt`, and the references in that cohort. Review the affected records, export any required audit information, and remove them only through a separately approved, controlled Sanity operation.

Example source values:

```csv
Recipient Name,Program Code,Training Title,Training Duration,Original Issue Date,Legacy Certificate Number,Cohort,Status
Historical Test One,RCM,Historical Migration Test,1 hour,2026-08-01,,Phase 9D Test,valid
```

Phase 9D.1 also provides shared local spreadsheet parsing helpers for `.xlsx` and `.csv` files, with a 5 MB limit, first-worksheet behavior, normalized headers, blank-row handling, and duplicate reporting. Spreadsheet values must be reviewed in preview before any migration transaction. The reference PDF and real historical batch are never auto-imported.

The Historical Certificate Migration tool now exposes Manual Entry and Upload Excel / CSV modes. Uploads show merged shared defaults and row overrides in a review table before confirmation. Required values remain recipient, program code, training title, duration, and an unambiguous `YYYY-MM-DD` original issue date. Row values override shared defaults when present; blank row values use the shared defaults. Invalid rows, duplicate historical matches, legacy-number collisions, and certificate-number collisions block confirmation.
