namespace HarmonyBlend.Pages.Cart
{
	partial class CartDetails
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing) {
			if(disposing && (components != null)) {
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent() {
			DataGridViewCellStyle dataGridViewCellStyle1 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle2 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle3 = new DataGridViewCellStyle();
			DataGridViewCellStyle dataGridViewCellStyle4 = new DataGridViewCellStyle();
			panel1 = new Panel();
			CartDetails_groupBox = new GroupBox();
			label5 = new Label();
			totalPayment_label = new Label();
			confirm_button = new Button();
			totalOrderCount_label = new Label();
			edit_button = new Button();
			label6 = new Label();
			totalPriceCheck_checkBox = new CheckBox();
			header1 = new UserControls.Header();
			dataGridView1 = new DataGridView();
			Check = new DataGridViewCheckBoxColumn();
			ProductName = new DataGridViewTextBoxColumn();
			Amount = new DataGridViewTextBoxColumn();
			Unit = new DataGridViewTextBoxColumn();
			ListPrice = new DataGridViewTextBoxColumn();
			TotalPrice = new DataGridViewTextBoxColumn();
			panel2 = new Panel();
			panel1.SuspendLayout();
			CartDetails_groupBox.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			panel2.SuspendLayout();
			SuspendLayout();
			// 
			// panel1
			// 
			panel1.Controls.Add(CartDetails_groupBox);
			panel1.Dock = DockStyle.Bottom;
			panel1.Location = new Point(0, 432);
			panel1.Name = "panel1";
			panel1.Size = new Size(906, 68);
			panel1.TabIndex = 3;
			// 
			// CartDetails_groupBox
			// 
			CartDetails_groupBox.Controls.Add(label5);
			CartDetails_groupBox.Controls.Add(totalPayment_label);
			CartDetails_groupBox.Controls.Add(confirm_button);
			CartDetails_groupBox.Controls.Add(totalOrderCount_label);
			CartDetails_groupBox.Controls.Add(edit_button);
			CartDetails_groupBox.Controls.Add(label6);
			CartDetails_groupBox.Controls.Add(totalPriceCheck_checkBox);
			CartDetails_groupBox.Dock = DockStyle.Bottom;
			CartDetails_groupBox.Location = new Point(0, -4);
			CartDetails_groupBox.Name = "CartDetails_groupBox";
			CartDetails_groupBox.Size = new Size(906, 72);
			CartDetails_groupBox.TabIndex = 9;
			CartDetails_groupBox.TabStop = false;
			// 
			// label5
			// 
			label5.AutoSize = true;
			label5.Font = new Font("Segoe UI", 12.75F);
			label5.ForeColor = SystemColors.ControlText;
			label5.Location = new Point(12, 15);
			label5.Name = "label5";
			label5.Size = new Size(163, 23);
			label5.TabIndex = 6;
			label5.Text = "Sipariş Ürün Miktarı:";
			// 
			// totalPayment_label
			// 
			totalPayment_label.AutoSize = true;
			totalPayment_label.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			totalPayment_label.Location = new Point(181, 39);
			totalPayment_label.Name = "totalPayment_label";
			totalPayment_label.Size = new Size(99, 23);
			totalPayment_label.TabIndex = 7;
			totalPayment_label.Text = "1234.56 TL";
			// 
			// confirm_button
			// 
			confirm_button.Enabled = false;
			confirm_button.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			confirm_button.Location = new Point(715, 15);
			confirm_button.Name = "confirm_button";
			confirm_button.Size = new Size(174, 43);
			confirm_button.TabIndex = 0;
			confirm_button.Text = "Confirm Orders";
			confirm_button.UseVisualStyleBackColor = true;
			confirm_button.Click += confirm_button_Click;
			// 
			// totalOrderCount_label
			// 
			totalOrderCount_label.AutoSize = true;
			totalOrderCount_label.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			totalOrderCount_label.Location = new Point(181, 15);
			totalOrderCount_label.Name = "totalOrderCount_label";
			totalOrderCount_label.Size = new Size(50, 23);
			totalOrderCount_label.TabIndex = 8;
			totalOrderCount_label.Text = "1234";
			// 
			// edit_button
			// 
			edit_button.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			edit_button.Location = new Point(535, 15);
			edit_button.Name = "edit_button";
			edit_button.Size = new Size(174, 43);
			edit_button.TabIndex = 0;
			edit_button.Text = "Edit Orders";
			edit_button.UseVisualStyleBackColor = true;
			// 
			// label6
			// 
			label6.AutoSize = true;
			label6.Font = new Font("Segoe UI", 12.75F);
			label6.ForeColor = SystemColors.ControlText;
			label6.Location = new Point(7, 39);
			label6.Name = "label6";
			label6.Size = new Size(168, 23);
			label6.TabIndex = 5;
			label6.Text = "Sipariş Toplam Tutar:";
			// 
			// totalPriceCheck_checkBox
			// 
			totalPriceCheck_checkBox.AutoSize = true;
			totalPriceCheck_checkBox.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold);
			totalPriceCheck_checkBox.Location = new Point(318, 24);
			totalPriceCheck_checkBox.Name = "totalPriceCheck_checkBox";
			totalPriceCheck_checkBox.Size = new Size(211, 27);
			totalPriceCheck_checkBox.TabIndex = 2;
			totalPriceCheck_checkBox.Text = "Informations Checked!";
			totalPriceCheck_checkBox.UseVisualStyleBackColor = true;
			totalPriceCheck_checkBox.CheckedChanged += totalPriceCheck_checkBox_CheckedChanged;
			// 
			// header1
			// 
			header1.Dock = DockStyle.Top;
			header1.Location = new Point(0, 0);
			header1.Name = "header1";
			header1.Size = new Size(906, 30);
			header1.TabIndex = 2;
			// 
			// dataGridView1
			// 
			dataGridView1.AllowUserToAddRows = false;
			dataGridView1.AllowUserToDeleteRows = false;
			dataGridViewCellStyle1.BackColor = Color.FromArgb(224, 224, 224);
			dataGridView1.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
			dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			dataGridView1.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCellsExceptHeaders;
			dataGridView1.BackgroundColor = Color.DimGray;
			dataGridView1.BorderStyle = BorderStyle.None;
			dataGridView1.CellBorderStyle = DataGridViewCellBorderStyle.SingleHorizontal;
			dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle2.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle2.Font = new Font("Segoe UI", 11.25F, FontStyle.Regular, GraphicsUnit.Point, 162);
			dataGridViewCellStyle2.ForeColor = SystemColors.Window;
			dataGridViewCellStyle2.SelectionBackColor = Color.Silver;
			dataGridViewCellStyle2.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle2.WrapMode = DataGridViewTriState.True;
			dataGridView1.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle2;
			dataGridView1.ColumnHeadersHeight = 30;
			dataGridView1.Columns.AddRange(new DataGridViewColumn[] { Check, ProductName, Amount, Unit, ListPrice, TotalPrice });
			dataGridViewCellStyle3.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle3.BackColor = Color.Gainsboro;
			dataGridViewCellStyle3.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle3.ForeColor = SystemColors.ControlText;
			dataGridViewCellStyle3.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle3.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle3.WrapMode = DataGridViewTriState.False;
			dataGridView1.DefaultCellStyle = dataGridViewCellStyle3;
			dataGridView1.Dock = DockStyle.Fill;
			dataGridView1.Location = new Point(0, 0);
			dataGridView1.MultiSelect = false;
			dataGridView1.Name = "dataGridView1";
			dataGridView1.ReadOnly = true;
			dataGridViewCellStyle4.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle4.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle4.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			dataGridViewCellStyle4.ForeColor = SystemColors.Window;
			dataGridViewCellStyle4.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle4.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle4.WrapMode = DataGridViewTriState.True;
			dataGridView1.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
			dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			dataGridView1.Size = new Size(906, 402);
			dataGridView1.TabIndex = 1;
			// 
			// Check
			// 
			Check.AutoSizeMode = DataGridViewAutoSizeColumnMode.AllCellsExceptHeader;
			Check.Frozen = true;
			Check.HeaderText = "";
			Check.MinimumWidth = 30;
			Check.Name = "Check";
			Check.ReadOnly = true;
			Check.Width = 30;
			// 
			// ProductName
			// 
			ProductName.AutoSizeMode = DataGridViewAutoSizeColumnMode.None;
			ProductName.FillWeight = 771.5736F;
			ProductName.Frozen = true;
			ProductName.HeaderText = "ProductName";
			ProductName.MinimumWidth = 200;
			ProductName.Name = "ProductName";
			ProductName.ReadOnly = true;
			ProductName.Width = 415;
			// 
			// Amount
			// 
			Amount.FillWeight = 25.3807087F;
			Amount.HeaderText = "Amount";
			Amount.MinimumWidth = 100;
			Amount.Name = "Amount";
			Amount.ReadOnly = true;
			// 
			// Unit
			// 
			Unit.FillWeight = 25.3807087F;
			Unit.HeaderText = "Unit";
			Unit.MinimumWidth = 50;
			Unit.Name = "Unit";
			Unit.ReadOnly = true;
			// 
			// ListPrice
			// 
			ListPrice.FillWeight = 25.3807087F;
			ListPrice.HeaderText = "ListPrice";
			ListPrice.MinimumWidth = 100;
			ListPrice.Name = "ListPrice";
			ListPrice.ReadOnly = true;
			// 
			// TotalPrice
			// 
			TotalPrice.FillWeight = 25.3807087F;
			TotalPrice.HeaderText = "TotalPrice";
			TotalPrice.MinimumWidth = 200;
			TotalPrice.Name = "TotalPrice";
			TotalPrice.ReadOnly = true;
			// 
			// panel2
			// 
			panel2.AccessibleName = "CartDetails";
			panel2.Controls.Add(dataGridView1);
			panel2.Dock = DockStyle.Fill;
			panel2.Location = new Point(0, 30);
			panel2.Name = "panel2";
			panel2.Size = new Size(906, 402);
			panel2.TabIndex = 7;
			// 
			// CartDetails
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			ClientSize = new Size(906, 500);
			Controls.Add(panel2);
			Controls.Add(header1);
			Controls.Add(panel1);
			FormBorderStyle = FormBorderStyle.None;
			MaximumSize = new Size(906, 500);
			MinimumSize = new Size(906, 300);
			Name = "CartDetails";
			StartPosition = FormStartPosition.CenterScreen;
			Text = "CartDetails";
			panel1.ResumeLayout(false);
			CartDetails_groupBox.ResumeLayout(false);
			CartDetails_groupBox.PerformLayout();
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			panel2.ResumeLayout(false);
			ResumeLayout(false);
		}

		#endregion
		private Panel panel1;
		private Label totalPayment_label;
		private Label totalOrderCount_label;
		private Label label6;
		private Label label5;
		internal Button edit_button;
		internal Button confirm_button;
		internal CheckBox totalPriceCheck_checkBox;
		private GroupBox CartDetails_groupBox;
		private UserControls.Header header1;
		private DataGridView dataGridView1;
		private DataGridViewCheckBoxColumn Check;
		private DataGridViewTextBoxColumn ProductName;
		private DataGridViewTextBoxColumn Amount;
		private DataGridViewTextBoxColumn Unit;
		private DataGridViewTextBoxColumn ListPrice;
		private DataGridViewTextBoxColumn TotalPrice;
		private Panel panel2;
	}
}