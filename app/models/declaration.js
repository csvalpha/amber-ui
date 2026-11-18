import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

// Keys are the status values of the API
/* eslint-disable camelcase */
export const STATUS_LABELS = {
  pending: 'In behandeling',
  approved: 'Goedgekeurd',
  partially_paid: 'Gedeeltelijk uitbetaald',
  paid: 'Uitbetaald',
  rejected: 'Afgekeurd',
};

const STATUS_CLASSES = {
  pending: 'bg-secondary',
  approved: 'bg-info',
  partially_paid: 'bg-warning text-dark',
  paid: 'bg-success',
  rejected: 'bg-danger',
};
/* eslint-enable camelcase */

export default class Declaration extends Model {
  @attr('number') amount;
  @attr description;
  @attr('date-only') purchaseDate;
  @attr receipt;
  @attr missingReceiptReason;
  @attr status;
  @attr rejectionReason;
  @attr('boolean') includeInNextCollection;
  @attr('date') approvedAt;
  @attr('number') paidAmount;
  @attr('number') openAmount;
  @attr('boolean') hasReceipt;
  @attr('date') pdfUploadedAt;
  // Same name as the PDF in Nextcloud, e.g. 2026-11-18_jan_de-vries_12_declaratie.pdf
  @attr pdfFilename;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Relationships
  @belongsTo('user', { inverse: null }) user;
  @belongsTo('user', { inverse: null }) approvedBy;
  @hasMany('debit/transaction', { inverse: 'declaration' }) transactions;

  get statusLabel() {
    return STATUS_LABELS[this.status];
  }

  get statusClass() {
    return STATUS_CLASSES[this.status];
  }

  get isPending() {
    return this.status === 'pending';
  }

  get isApproved() {
    return this.status === 'approved';
  }

  get isPartiallyPaid() {
    return this.status === 'partially_paid';
  }

  get isSettleable() {
    return this.isApproved || this.isPartiallyPaid;
  }

  get hasPdf() {
    return Boolean(this.approvedAt) && this.status !== 'rejected';
  }

  // Only image data urls can be previewed in an <img>, a PDF receipt can not
  get receiptPreview() {
    return this.receipt?.startsWith('data:image/') ? this.receipt : null;
  }

  isOwner(user) {
    return user.get('id') === this.belongsTo('user').id();
  }
}
