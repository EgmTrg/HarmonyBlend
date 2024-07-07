namespace HarmonyBlend.Pages
{
	partial class Orders
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
			orderPage_panel = new Panel();
			information_groupBox = new GroupBox();
			clearSelected_button = new Button();
			clearCart_button = new Button();
			Order_Button = new Button();
			getCartInfos_button = new Button();
			totalPayment_label = new Label();
			totalKDV_label = new Label();
			totalOrderCount_label = new Label();
			label6 = new Label();
			label4 = new Label();
			label5 = new Label();
			filters_groupBox = new GroupBox();
			clearFilter_button = new Button();
			categories_checkedListBox = new CheckedListBox();
			productCode_maskedTextBox = new MaskedTextBox();
			productName_textBox = new TextBox();
			label3 = new Label();
			label2 = new Label();
			label1 = new Label();
			panel3 = new Panel();
			panel2 = new Panel();
			dataGridView1 = new DataGridView();
			Image = new DataGridViewImageColumn();
			Favorite = new DataGridViewCheckBoxColumn();
			Check = new DataGridViewCheckBoxColumn();
			PCode = new DataGridViewTextBoxColumn();
			PName = new DataGridViewTextBoxColumn();
			Amount = new DataGridViewTextBoxColumn();
			Unit = new DataGridViewTextBoxColumn();
			ListPrice = new DataGridViewTextBoxColumn();
			KDV = new DataGridViewTextBoxColumn();
			TotalPrice = new DataGridViewTextBoxColumn();
			KDVPercent = new DataGridViewTextBoxColumn();
			orderPage_panel.SuspendLayout();
			information_groupBox.SuspendLayout();
			filters_groupBox.SuspendLayout();
			panel2.SuspendLayout();
			((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
			SuspendLayout();
			// 
			// orderPage_panel
			// 
			orderPage_panel.Controls.Add(information_groupBox);
			orderPage_panel.Controls.Add(filters_groupBox);
			orderPage_panel.Controls.Add(label1);
			orderPage_panel.Dock = DockStyle.Top;
			orderPage_panel.Location = new Point(0, 0);
			orderPage_panel.Name = "orderPage_panel";
			orderPage_panel.Size = new Size(1243, 168);
			orderPage_panel.TabIndex = 0;
			// 
			// information_groupBox
			// 
			information_groupBox.Controls.Add(clearSelected_button);
			information_groupBox.Controls.Add(clearCart_button);
			information_groupBox.Controls.Add(Order_Button);
			information_groupBox.Controls.Add(getCartInfos_button);
			information_groupBox.Controls.Add(totalPayment_label);
			information_groupBox.Controls.Add(totalKDV_label);
			information_groupBox.Controls.Add(totalOrderCount_label);
			information_groupBox.Controls.Add(label6);
			information_groupBox.Controls.Add(label4);
			information_groupBox.Controls.Add(label5);
			information_groupBox.ForeColor = SystemColors.Control;
			information_groupBox.Location = new Point(679, 39);
			information_groupBox.Name = "information_groupBox";
			information_groupBox.Size = new Size(547, 123);
			information_groupBox.TabIndex = 3;
			information_groupBox.TabStop = false;
			information_groupBox.Text = "Bilgilendirme";
			// 
			// clearSelected_button
			// 
			clearSelected_button.ForeColor = SystemColors.ActiveCaptionText;
			clearSelected_button.Location = new Point(309, 21);
			clearSelected_button.Name = "clearSelected_button";
			clearSelected_button.Size = new Size(113, 28);
			clearSelected_button.TabIndex = 1;
			clearSelected_button.Text = "Seçilenleri Temizle";
			clearSelected_button.UseVisualStyleBackColor = true;
			// 
			// clearCart_button
			// 
			clearCart_button.ForeColor = SystemColors.ActiveCaptionText;
			clearCart_button.Location = new Point(309, 52);
			clearCart_button.Name = "clearCart_button";
			clearCart_button.Size = new Size(113, 28);
			clearCart_button.TabIndex = 1;
			clearCart_button.Text = "Sepeti Temizle";
			clearCart_button.UseVisualStyleBackColor = true;
			clearCart_button.Click += clearCart_button_Click;
			// 
			// Order_Button
			// 
			Order_Button.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			Order_Button.ForeColor = Color.Black;
			Order_Button.Location = new Point(428, 21);
			Order_Button.Name = "Order_Button";
			Order_Button.Size = new Size(113, 90);
			Order_Button.TabIndex = 5;
			Order_Button.Text = "Seçilenleri Sepete Ekle";
			Order_Button.UseVisualStyleBackColor = true;
			Order_Button.Click += AddAllProductsToCart_Button_Click;
			// 
			// getCartInfos_button
			// 
			getCartInfos_button.ForeColor = SystemColors.ActiveCaptionText;
			getCartInfos_button.Location = new Point(309, 83);
			getCartInfos_button.Name = "getCartInfos_button";
			getCartInfos_button.Size = new Size(113, 28);
			getCartInfos_button.TabIndex = 1;
			getCartInfos_button.Text = "Sepet Bilgilerini Al";
			getCartInfos_button.UseVisualStyleBackColor = true;
			getCartInfos_button.Click += getCartInfos_button_Click;
			// 
			// totalPayment_label
			// 
			totalPayment_label.AutoSize = true;
			totalPayment_label.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			totalPayment_label.Location = new Point(158, 90);
			totalPayment_label.Name = "totalPayment_label";
			totalPayment_label.Size = new Size(99, 23);
			totalPayment_label.TabIndex = 4;
			totalPayment_label.Text = "1234.56 TL";
			// 
			// totalKDV_label
			// 
			totalKDV_label.AutoSize = true;
			totalKDV_label.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			totalKDV_label.Location = new Point(158, 56);
			totalKDV_label.Name = "totalKDV_label";
			totalKDV_label.Size = new Size(69, 23);
			totalKDV_label.TabIndex = 4;
			totalKDV_label.Text = "1,23 TL";
			// 
			// totalOrderCount_label
			// 
			totalOrderCount_label.AutoSize = true;
			totalOrderCount_label.Font = new Font("Segoe UI", 12.75F, FontStyle.Bold, GraphicsUnit.Point, 162);
			totalOrderCount_label.Location = new Point(158, 22);
			totalOrderCount_label.Name = "totalOrderCount_label";
			totalOrderCount_label.Size = new Size(50, 23);
			totalOrderCount_label.TabIndex = 4;
			totalOrderCount_label.Text = "1234";
			// 
			// label6
			// 
			label6.AutoSize = true;
			label6.Font = new Font("Segoe UI", 10F);
			label6.ForeColor = SystemColors.Control;
			label6.Location = new Point(17, 93);
			label6.Name = "label6";
			label6.Size = new Size(135, 19);
			label6.TabIndex = 3;
			label6.Text = "Sipariş Toplam Tutar:";
			// 
			// label4
			// 
			label4.AutoSize = true;
			label4.Font = new Font("Segoe UI", 10F);
			label4.ForeColor = SystemColors.Control;
			label4.Location = new Point(31, 59);
			label4.Name = "label4";
			label4.Size = new Size(121, 19);
			label4.TabIndex = 3;
			label4.Text = "Sipariş KDV Tutarı:";
			// 
			// label5
			// 
			label5.AutoSize = true;
			label5.Font = new Font("Segoe UI", 10F);
			label5.ForeColor = SystemColors.Control;
			label5.Location = new Point(20, 25);
			label5.Name = "label5";
			label5.Size = new Size(133, 19);
			label5.TabIndex = 3;
			label5.Text = "Sipariş Ürün Miktarı:";
			// 
			// filters_groupBox
			// 
			filters_groupBox.Controls.Add(clearFilter_button);
			filters_groupBox.Controls.Add(categories_checkedListBox);
			filters_groupBox.Controls.Add(productCode_maskedTextBox);
			filters_groupBox.Controls.Add(productName_textBox);
			filters_groupBox.Controls.Add(label3);
			filters_groupBox.Controls.Add(label2);
			filters_groupBox.ForeColor = SystemColors.Control;
			filters_groupBox.Location = new Point(12, 39);
			filters_groupBox.Name = "filters_groupBox";
			filters_groupBox.Size = new Size(656, 123);
			filters_groupBox.TabIndex = 2;
			filters_groupBox.TabStop = false;
			filters_groupBox.Text = "Filtre";
			// 
			// clearFilter_button
			// 
			clearFilter_button.Font = new Font("Segoe UI Semibold", 10.25F, FontStyle.Bold);
			clearFilter_button.ForeColor = SystemColors.ActiveCaptionText;
			clearFilter_button.Location = new Point(296, 27);
			clearFilter_button.Name = "clearFilter_button";
			clearFilter_button.Size = new Size(78, 59);
			clearFilter_button.TabIndex = 14;
			clearFilter_button.Text = "Filtreyi Kaldir";
			clearFilter_button.UseVisualStyleBackColor = true;
			clearFilter_button.Click += clearFilter_button_Click;
			// 
			// categories_checkedListBox
			// 
			categories_checkedListBox.FormattingEnabled = true;
			categories_checkedListBox.Items.AddRange(new object[] { "Hepsi" });
			categories_checkedListBox.Location = new Point(380, 27);
			categories_checkedListBox.Name = "categories_checkedListBox";
			categories_checkedListBox.Size = new Size(175, 58);
			categories_checkedListBox.TabIndex = 13;
			// 
			// productCode_maskedTextBox
			// 
			productCode_maskedTextBox.Location = new Point(93, 27);
			productCode_maskedTextBox.Mask = "000.00.000";
			productCode_maskedTextBox.Name = "productCode_maskedTextBox";
			productCode_maskedTextBox.Size = new Size(197, 23);
			productCode_maskedTextBox.TabIndex = 12;
			productCode_maskedTextBox.TextChanged += productCode_maskedTextBox_TextChanged;
			// 
			// productName_textBox
			// 
			productName_textBox.Location = new Point(93, 63);
			productName_textBox.Name = "productName_textBox";
			productName_textBox.Size = new Size(197, 23);
			productName_textBox.TabIndex = 4;
			productName_textBox.TextChanged += productName_textBox_TextChanged;
			// 
			// label3
			// 
			label3.AutoSize = true;
			label3.ForeColor = SystemColors.Control;
			label3.Location = new Point(20, 66);
			label3.Name = "label3";
			label3.Size = new Size(57, 15);
			label3.TabIndex = 3;
			label3.Text = "Ürün Adı:";
			// 
			// label2
			// 
			label2.AutoSize = true;
			label2.ForeColor = SystemColors.Control;
			label2.Location = new Point(20, 30);
			label2.Name = "label2";
			label2.Size = new Size(67, 15);
			label2.TabIndex = 3;
			label2.Text = "Ürün Kodu:";
			// 
			// label1
			// 
			label1.AutoSize = true;
			label1.BackColor = Color.FromArgb(54, 64, 78);
			label1.Font = new Font("Castellar", 22.25F);
			label1.ForeColor = Color.White;
			label1.Location = new Point(12, 3);
			label1.Name = "label1";
			label1.Size = new Size(225, 36);
			label1.TabIndex = 1;
			label1.Text = "ORDER PAGE";
			// 
			// panel3
			// 
			panel3.Dock = DockStyle.Bottom;
			panel3.Location = new Point(0, 589);
			panel3.Name = "panel3";
			panel3.Size = new Size(1243, 63);
			panel3.TabIndex = 1;
			// 
			// panel2
			// 
			panel2.Controls.Add(dataGridView1);
			panel2.Dock = DockStyle.Fill;
			panel2.Location = new Point(0, 168);
			panel2.Name = "panel2";
			panel2.Size = new Size(1243, 421);
			panel2.TabIndex = 2;
			// 
			// dataGridView1
			// 
			dataGridView1.AllowUserToAddRows = false;
			dataGridView1.AllowUserToDeleteRows = false;
			dataGridViewCellStyle1.BackColor = Color.FromArgb(224, 224, 224);
			dataGridView1.AlternatingRowsDefaultCellStyle = dataGridViewCellStyle1;
			dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;
			dataGridView1.AutoSizeRowsMode = DataGridViewAutoSizeRowsMode.DisplayedCellsExceptHeaders;
			dataGridView1.BackgroundColor = Color.FromArgb(39, 47, 59);
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
			dataGridView1.Columns.AddRange(new DataGridViewColumn[] { Image, Favorite, Check, PCode, PName, Amount, Unit, ListPrice, KDV, TotalPrice, KDVPercent });
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
			dataGridViewCellStyle4.Alignment = DataGridViewContentAlignment.MiddleCenter;
			dataGridViewCellStyle4.BackColor = Color.FromArgb(54, 64, 78);
			dataGridViewCellStyle4.Font = new Font("Segoe UI Semibold", 12F, FontStyle.Bold, GraphicsUnit.Point, 162);
			dataGridViewCellStyle4.ForeColor = SystemColors.Window;
			dataGridViewCellStyle4.SelectionBackColor = SystemColors.Highlight;
			dataGridViewCellStyle4.SelectionForeColor = SystemColors.HighlightText;
			dataGridViewCellStyle4.WrapMode = DataGridViewTriState.True;
			dataGridView1.RowHeadersDefaultCellStyle = dataGridViewCellStyle4;
			dataGridView1.ScrollBars = ScrollBars.Vertical;
			dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
			dataGridView1.Size = new Size(1243, 421);
			dataGridView1.TabIndex = 0;
			dataGridView1.CellValueChanged += dataGridView1_CellValueChanged;
			dataGridView1.EditingControlShowing += dataGridView1_EditingControlShowing;
			// 
			// Image
			// 
			Image.FillWeight = 25.3807087F;
			Image.HeaderText = "Image";
			Image.MinimumWidth = 100;
			Image.Name = "Image";
			// 
			// Favorite
			// 
			Favorite.FillWeight = 25.3807087F;
			Favorite.HeaderText = "Favorite";
			Favorite.MinimumWidth = 75;
			Favorite.Name = "Favorite";
			// 
			// Check
			// 
			Check.FillWeight = 25.3807087F;
			Check.HeaderText = "Check";
			Check.MinimumWidth = 60;
			Check.Name = "Check";
			// 
			// PCode
			// 
			PCode.FillWeight = 25.3807087F;
			PCode.HeaderText = "PCode";
			PCode.MinimumWidth = 120;
			PCode.Name = "PCode";
			// 
			// PName
			// 
			PName.FillWeight = 771.5736F;
			PName.HeaderText = "PName";
			PName.MinimumWidth = 200;
			PName.Name = "PName";
			// 
			// Amount
			// 
			Amount.FillWeight = 25.3807087F;
			Amount.HeaderText = "Amount";
			Amount.MinimumWidth = 100;
			Amount.Name = "Amount";
			// 
			// Unit
			// 
			Unit.FillWeight = 25.3807087F;
			Unit.HeaderText = "Unit";
			Unit.MinimumWidth = 50;
			Unit.Name = "Unit";
			// 
			// ListPrice
			// 
			ListPrice.FillWeight = 25.3807087F;
			ListPrice.HeaderText = "List Price";
			ListPrice.MinimumWidth = 100;
			ListPrice.Name = "ListPrice";
			// 
			// KDV
			// 
			KDV.FillWeight = 25.3807087F;
			KDV.HeaderText = "KDV";
			KDV.MinimumWidth = 100;
			KDV.Name = "KDV";
			// 
			// TotalPrice
			// 
			TotalPrice.FillWeight = 25.3807087F;
			TotalPrice.HeaderText = "Total Price";
			TotalPrice.MinimumWidth = 200;
			TotalPrice.Name = "TotalPrice";
			// 
			// KDVPercent
			// 
			KDVPercent.HeaderText = "KDVPercent";
			KDVPercent.MinimumWidth = 100;
			KDVPercent.Name = "KDVPercent";
			// 
			// Orders
			// 
			AutoScaleDimensions = new SizeF(7F, 15F);
			AutoScaleMode = AutoScaleMode.Font;
			BackColor = Color.FromArgb(39, 47, 59);
			ClientSize = new Size(1243, 652);
			Controls.Add(panel2);
			Controls.Add(panel3);
			Controls.Add(orderPage_panel);
			FormBorderStyle = FormBorderStyle.None;
			Name = "Orders";
			Text = "SubPage1";
			Load += Order_Load;
			orderPage_panel.ResumeLayout(false);
			orderPage_panel.PerformLayout();
			information_groupBox.ResumeLayout(false);
			information_groupBox.PerformLayout();
			filters_groupBox.ResumeLayout(false);
			filters_groupBox.PerformLayout();
			panel2.ResumeLayout(false);
			((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
			ResumeLayout(false);
		}

		#endregion

		private Panel orderPage_panel;
		private Panel panel3;
		private Panel panel2;
		private DataGridView dataGridView1;
		private Label label1;
		private GroupBox filters_groupBox;
		private Label label2;
		private TextBox productName_textBox;
		private Label label3;
		private GroupBox information_groupBox;
		private Button Order_Button;
		private Label totalPayment_label;
		private Label totalKDV_label;
		private Label totalOrderCount_label;
		private Label label6;
		private Label label4;
		private Label label5;
		private Button getCartInfos_button;
		private Button clearCart_button;
		private Button clearSelected_button;
		private MaskedTextBox productCode_maskedTextBox;
		private CheckedListBox categories_checkedListBox;
		private Button clearFilter_button;
		private DataGridViewImageColumn Image;
		private DataGridViewCheckBoxColumn Favorite;
		private DataGridViewCheckBoxColumn Check;
		private DataGridViewTextBoxColumn PCode;
		private DataGridViewTextBoxColumn PName;
		private DataGridViewTextBoxColumn Amount;
		private DataGridViewTextBoxColumn Unit;
		private DataGridViewTextBoxColumn ListPrice;
		private DataGridViewTextBoxColumn KDV;
		private DataGridViewTextBoxColumn TotalPrice;
		private DataGridViewTextBoxColumn KDVPercent;
	}
}