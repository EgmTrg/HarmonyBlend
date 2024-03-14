namespace HarmonyBlend.Pages
{
	partial class Settings
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
			groupBox1 = new GroupBox();
			tableLayoutPanel1 = new TableLayoutPanel();
			label8 = new Label();
			groupBox2 = new GroupBox();
			productCode_maskedTextBox = new MaskedTextBox();
			label2 = new Label();
			label3 = new Label();
			label4 = new Label();
			label5 = new Label();
			deleteActivate_checkBox = new CheckBox();
			label6 = new Label();
			productName_textBox = new TextBox();
			saveChanges_button = new Button();
			productPrice_textbox = new TextBox();
			addProduct_button = new Button();
			productUnit_comboBox = new ComboBox();
			deleteProduct_button = new Button();
			activePassive_comboBox = new ComboBox();
			allProducts_dataGridView = new DataGridView();
			activeProducts_dataGridView = new DataGridView();
			label7 = new Label();
			label1 = new Label();
			groupBox1.SuspendLayout();
			tableLayoutPanel1.SuspendLayout();
			groupBox2.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)allProducts_dataGridView).BeginInit();
			((System.ComponentModel.ISupportInitialize)activeProducts_dataGridView).BeginInit();
			SuspendLayout();
			// 
			// groupBox1
			// 
			groupBox1.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
			groupBox1.Controls.Add(tableLayoutPanel1);
			groupBox1.ForeColor = SystemColors.Control;
			groupBox1.Location = new Point(12, 61);
			groupBox1.Name = "groupBox1";
			groupBox1.Size = new Size(1124, 722);
			groupBox1.TabIndex = 0;
			groupBox1.TabStop = false;
			groupBox1.Text = "Stok";
			// 
			// tableLayoutPanel1
			// 
			tableLayoutPanel1.Anchor = AnchorStyles.Top | AnchorStyles.Bottom | AnchorStyles.Left | AnchorStyles.Right;
			tableLayoutPanel1.ColumnCount = 2;
			tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));
			tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 50F));
			tableLayoutPanel1.Controls.Add(label8, 1, 0);
			tableLayoutPanel1.Controls.Add(groupBox2, 0, 2);
			tableLayoutPanel1.Controls.Add(allProducts_dataGridView, 0, 1);
			tableLayoutPanel1.Controls.Add(activeProducts_dataGridView, 1, 1);
			tableLayoutPanel1.Controls.Add(label7, 0, 0);
			tableLayoutPanel1.Location = new Point(6, 48);
			tableLayoutPanel1.Name = "tableLayoutPanel1";
			tableLayoutPanel1.RowCount = 3;
			tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Absolute, 25F));
			tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Percent, 65F));
			tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Percent, 35F));
			tableLayoutPanel1.Size = new Size(1112, 668);
			tableLayoutPanel1.TabIndex = 12;
			// 
			// label8
			// 
			label8.AutoSize = true;
			label8.Font = new Font("Segoe UI Semibold", 13.75F, FontStyle.Bold);
			label8.Location = new Point(559, 0);
			label8.Name = "label8";
			label8.Size = new Size(76, 25);
			label8.TabIndex = 15;
			label8.Text = "Aktifler";
			// 
			// groupBox2
			// 
			groupBox2.Controls.Add(productCode_maskedTextBox);
			groupBox2.Controls.Add(label2);
			groupBox2.Controls.Add(label3);
			groupBox2.Controls.Add(label4);
			groupBox2.Controls.Add(label5);
			groupBox2.Controls.Add(deleteActivate_checkBox);
			groupBox2.Controls.Add(label6);
			groupBox2.Controls.Add(productName_textBox);
			groupBox2.Controls.Add(saveChanges_button);
			groupBox2.Controls.Add(productPrice_textbox);
			groupBox2.Controls.Add(addProduct_button);
			groupBox2.Controls.Add(productUnit_comboBox);
			groupBox2.Controls.Add(deleteProduct_button);
			groupBox2.Controls.Add(activePassive_comboBox);
			groupBox2.Dock = DockStyle.Fill;
			groupBox2.ForeColor = SystemColors.Control;
			groupBox2.Location = new Point(3, 445);
			groupBox2.Name = "groupBox2";
			groupBox2.Size = new Size(550, 220);
			groupBox2.TabIndex = 13;
			groupBox2.TabStop = false;
			groupBox2.Text = "Duzenlemeler";
			// 
			// productCode_maskedTextBox
			// 
			productCode_maskedTextBox.Location = new Point(117, 34);
			productCode_maskedTextBox.Mask = "000.00.000";
			productCode_maskedTextBox.Name = "productCode_maskedTextBox";
			productCode_maskedTextBox.Size = new Size(190, 23);
			productCode_maskedTextBox.TabIndex = 11;
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label2.ForeColor = Color.White;
			label2.Location = new Point(23, 33);
			label2.Name = "label2";
			label2.Size = new Size(88, 20);
			label2.TabIndex = 4;
			label2.Text = "Ürün Kodu:";
			// 
			// label3
			// 
			label3.AutoSize = true;
			label3.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label3.ForeColor = Color.White;
			label3.Location = new Point(23, 72);
			label3.Name = "label3";
			label3.Size = new Size(75, 20);
			label3.TabIndex = 4;
			label3.Text = "Ürün Adı:";
			// 
			// label4
			// 
			label4.AutoSize = true;
			label4.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label4.ForeColor = Color.White;
			label4.Location = new Point(313, 36);
			label4.Name = "label4";
			label4.Size = new Size(92, 20);
			label4.TabIndex = 4;
			label4.Text = "Ürün Birimi:";
			// 
			// label5
			// 
			label5.AutoSize = true;
			label5.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label5.ForeColor = Color.White;
			label5.Location = new Point(23, 107);
			label5.Name = "label5";
			label5.Size = new Size(85, 20);
			label5.TabIndex = 4;
			label5.Text = "Satış Fiyatı:";
			// 
			// deleteActivate_checkBox
			// 
			deleteActivate_checkBox.AutoSize = true;
			deleteActivate_checkBox.Font = new Font("Segoe UI", 12F);
			deleteActivate_checkBox.Location = new Point(55, 188);
			deleteActivate_checkBox.Name = "deleteActivate_checkBox";
			deleteActivate_checkBox.Size = new Size(194, 25);
			deleteActivate_checkBox.TabIndex = 10;
			deleteActivate_checkBox.Text = "Ürünü Silmek İstiyorum";
			deleteActivate_checkBox.UseVisualStyleBackColor = true;
			deleteActivate_checkBox.CheckedChanged += checkBox1_CheckedChanged;
			// 
			// label6
			// 
			label6.AutoSize = true;
			label6.Font = new Font("Segoe UI Semibold", 11.25F, FontStyle.Bold);
			label6.ForeColor = Color.White;
			label6.Location = new Point(313, 72);
			label6.Name = "label6";
			label6.Size = new Size(92, 20);
			label6.TabIndex = 4;
			label6.Text = "Aktif / Pasif:";
			// 
			// productName_textBox
			// 
			productName_textBox.Location = new Point(117, 71);
			productName_textBox.Name = "productName_textBox";
			productName_textBox.Size = new Size(190, 23);
			productName_textBox.TabIndex = 5;
			// 
			// saveChanges_button
			// 
			saveChanges_button.Font = new Font("Segoe UI", 12F);
			saveChanges_button.ForeColor = Color.FromArgb(39, 47, 59);
			saveChanges_button.Location = new Point(279, 144);
			saveChanges_button.Name = "saveChanges_button";
			saveChanges_button.Size = new Size(245, 33);
			saveChanges_button.TabIndex = 7;
			saveChanges_button.Text = "Değişiklikleri Kaydet";
			saveChanges_button.UseVisualStyleBackColor = true;
			// 
			// productPrice_textbox
			// 
			productPrice_textbox.Location = new Point(117, 106);
			productPrice_textbox.Name = "productPrice_textbox";
			productPrice_textbox.Size = new Size(190, 23);
			productPrice_textbox.TabIndex = 5;
			// 
			// addProduct_button
			// 
			addProduct_button.Font = new Font("Segoe UI", 12F);
			addProduct_button.ForeColor = Color.FromArgb(39, 47, 59);
			addProduct_button.Location = new Point(23, 144);
			addProduct_button.Name = "addProduct_button";
			addProduct_button.Size = new Size(245, 33);
			addProduct_button.TabIndex = 7;
			addProduct_button.Text = "Ürünü Ekle";
			addProduct_button.UseVisualStyleBackColor = true;
			// 
			// productUnit_comboBox
			// 
			productUnit_comboBox.FormattingEnabled = true;
			productUnit_comboBox.Items.AddRange(new object[] { "Tepsi", "KG", "Adet", "Koli", "Kutu", "Paket" });
			productUnit_comboBox.Location = new Point(407, 35);
			productUnit_comboBox.Name = "productUnit_comboBox";
			productUnit_comboBox.Size = new Size(75, 23);
			productUnit_comboBox.TabIndex = 6;
			// 
			// deleteProduct_button
			// 
			deleteProduct_button.Enabled = false;
			deleteProduct_button.Font = new Font("Segoe UI", 12F);
			deleteProduct_button.ForeColor = Color.FromArgb(39, 47, 59);
			deleteProduct_button.Location = new Point(279, 183);
			deleteProduct_button.Name = "deleteProduct_button";
			deleteProduct_button.Size = new Size(245, 33);
			deleteProduct_button.TabIndex = 7;
			deleteProduct_button.Text = "Ürünü Sil";
			deleteProduct_button.UseVisualStyleBackColor = true;
			deleteProduct_button.Click += deleteProduct_button_Click;
			// 
			// activePassive_comboBox
			// 
			activePassive_comboBox.FormattingEnabled = true;
			activePassive_comboBox.Items.AddRange(new object[] { "Aktif", "Pasif" });
			activePassive_comboBox.Location = new Point(407, 71);
			activePassive_comboBox.Name = "activePassive_comboBox";
			activePassive_comboBox.Size = new Size(105, 23);
			activePassive_comboBox.TabIndex = 6;
			// 
			// allProducts_dataGridView
			// 
			allProducts_dataGridView.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.DisplayedCells;
			dataGridViewCellStyle1.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle1.BackColor = SystemColors.ControlText;
			dataGridViewCellStyle1.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle1.ForeColor = SystemColors.WindowText;
			dataGridViewCellStyle1.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle1.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle1.WrapMode = DataGridViewTriState.True;
			allProducts_dataGridView.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
			allProducts_dataGridView.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			dataGridViewCellStyle2.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle2.BackColor = SystemColors.Window;
			dataGridViewCellStyle2.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle2.ForeColor = SystemColors.Control;
			dataGridViewCellStyle2.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle2.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle2.WrapMode = DataGridViewTriState.False;
			allProducts_dataGridView.DefaultCellStyle = dataGridViewCellStyle2;
			allProducts_dataGridView.Dock = DockStyle.Fill;
			allProducts_dataGridView.Location = new Point(3, 28);
			allProducts_dataGridView.Name = "allProducts_dataGridView";
			allProducts_dataGridView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			allProducts_dataGridView.Size = new Size(550, 411);
			allProducts_dataGridView.TabIndex = 9;
			allProducts_dataGridView.CellContentClick += allProducts_dataGridView_CellContentClick;
			// 
			// activeProducts_dataGridView
			// 
			activeProducts_dataGridView.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.DisplayedCells;
			activeProducts_dataGridView.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			dataGridViewCellStyle3.Alignment = DataGridViewContentAlignment.MiddleLeft;
			dataGridViewCellStyle3.BackColor = SystemColors.Window;
			dataGridViewCellStyle3.Font = new Font("Segoe UI", 9F);
			dataGridViewCellStyle3.ForeColor = SystemColors.Control;
			dataGridViewCellStyle3.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle3.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle3.WrapMode = DataGridViewTriState.False;
			activeProducts_dataGridView.DefaultCellStyle = dataGridViewCellStyle3;
			activeProducts_dataGridView.Dock = DockStyle.Fill;
			activeProducts_dataGridView.Location = new Point(559, 28);
			activeProducts_dataGridView.Name = "activeProducts_dataGridView";
			activeProducts_dataGridView.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			activeProducts_dataGridView.Size = new Size(550, 411);
			activeProducts_dataGridView.TabIndex = 9;
			// 
			// label7
			// 
			label7.AutoSize = true;
			label7.Font = new Font("Segoe UI Semibold", 13.75F, FontStyle.Bold);
			label7.Location = new Point(3, 0);
			label7.Name = "label7";
			label7.Size = new Size(118, 25);
			label7.TabIndex = 14;
			label7.Text = "Tüm Ürünler";
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.BackColor = Color.FromArgb(54, 64, 78);
			label1.Font = new Font("Castellar", 22.25F);
			label1.ForeColor = Color.White;
			label1.Location = new Point(12, 9);
			label1.Name = "label1";
			label1.Size = new Size(262, 36);
			label1.TabIndex = 2;
			label1.Text = "SETTINGS PAGE";
			// 
			// Settings
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			BackColor = Color.FromArgb(39, 47, 59);
			ClientSize = new Size(1180, 850);
			Controls.Add(label1);
			Controls.Add(groupBox1);
			FormBorderStyle = FormBorderStyle.None;
			Name = "Settings";
			Text = "Settings";
			Load += Settings_Load;
			groupBox1.ResumeLayout(false);
			tableLayoutPanel1.ResumeLayout(false);
			tableLayoutPanel1.PerformLayout();
			groupBox2.ResumeLayout(false);
			groupBox2.PerformLayout();
			((System.ComponentModel.ISupportInitialize)allProducts_dataGridView).EndInit();
			((System.ComponentModel.ISupportInitialize)activeProducts_dataGridView).EndInit();
			ResumeLayout(false);
			PerformLayout();
		}

		#endregion

		private GroupBox groupBox1;
		private Label label1;
		private Button deleteProduct_button;
		private ComboBox activePassive_comboBox;
		private ComboBox productUnit_comboBox;
		private TextBox productPrice_textbox;
		private TextBox productName_textBox;
		private Label label6;
		private Label label5;
		private Label label4;
		private Label label3;
		private Label label2;
		private Button addProduct_button;
		private DataGridView allProducts_dataGridView;
		private DataGridView activeProducts_dataGridView;
		private Button saveChanges_button;
		private CheckBox deleteActivate_checkBox;
		private TableLayoutPanel tableLayoutPanel1;
		private GroupBox groupBox2;
		private Label label8;
		private Label label7;
		private MaskedTextBox productCode_maskedTextBox;
	}
}